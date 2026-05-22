import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "todos.json");

function readTodos() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    return Array.isArray(data) ? data : [];
}

function writeTodos(todos) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

function nextId(todos) {
    if (todos.length === 0) return 1;
    return Math.max(...todos.map((t) => t.id)) + 1;
}

function sendJson(res, status, data) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(data));
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(e);
            }
        });
        req.on("error", reject);
    });
}

async function handleApi(req, res) {
    const url = new URL(req.url, "http://localhost");
    const { pathname } = url;

    if (req.method === "GET" && pathname === "/api/todos") {
        const userId = Number(url.searchParams.get("userId") || 1);
        const todos = readTodos().filter((t) => t.userId === userId);
        sendJson(res, 200, todos);
        return;
    }

    if (req.method === "POST" && pathname === "/api/todos") {
        const body = await parseBody(req);
        const todos = readTodos();
        const todo = {
            id: nextId(todos),
            userId: body.userId ?? 1,
            title: String(body.title ?? "").trim(),
            completed: Boolean(body.completed),
        };
        if (!todo.title) {
            sendJson(res, 400, { error: "title is required" });
            return;
        }
        todos.push(todo);
        writeTodos(todos);
        sendJson(res, 201, todo);
        return;
    }

    const match = pathname.match(/^\/api\/todos\/(\d+)$/);
    if (match) {
        const id = Number(match[1]);
        const todos = readTodos();
        const index = todos.findIndex((t) => t.id === id);

        if (index === -1) {
            sendJson(res, 404, { error: "Todo not found" });
            return;
        }

        if (req.method === "PATCH") {
            const body = await parseBody(req);
            if (body.completed !== undefined) {
                todos[index].completed = Boolean(body.completed);
            }
            if (body.title !== undefined) {
                todos[index].title = String(body.title);
            }
            writeTodos(todos);
            sendJson(res, 200, todos[index]);
            return;
        }

        if (req.method === "DELETE") {
            todos.splice(index, 1);
            writeTodos(todos);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end("{}");
            return;
        }
    }

    sendJson(res, 404, { error: "Not found" });
}

function createMiddleware() {
    return async (req, res, next) => {
        if (!req.url?.startsWith("/api")) {
            next();
            return;
        }

        try {
            await handleApi(req, res);
        } catch (e) {
            sendJson(res, 500, { error: e.message ?? "Server error" });
        }
    };
}

/** Локальный API (совместим с JSONPlaceholder) — работает без интернета */
export function todoApiPlugin() {
    const middleware = createMiddleware();

    return {
        name: "todo-local-api",
        configureServer(server) {
            server.middlewares.use(middleware);
        },
        configurePreviewServer(server) {
            server.middlewares.use(middleware);
        },
    };
}
