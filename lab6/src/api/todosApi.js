/** Локальный API через Vite (dev/preview). Не зависит от jsonplaceholder.typicode.com */
const BASE = "/api";
const USER_ID = 1;
const REQUEST_TIMEOUT_MS = 8000;

async function request(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            ...options,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        if (response.status === 204) {
            return null;
        }

        const text = await response.text();
        if (!text) {
            return null;
        }

        return JSON.parse(text);
    } catch (e) {
        if (e.name === "AbortError") {
            throw new Error(
                "Нет ответа от API. Перезапустите: cd lab6 && npm run dev",
            );
        }
        throw e;
    } finally {
        clearTimeout(timeoutId);
    }
}

export function fetchTodos() {
    return request(`${BASE}/todos?userId=${USER_ID}`);
}

export function createTodo(title) {
    return request(`${BASE}/todos`, {
        method: "POST",
        body: JSON.stringify({
            userId: USER_ID,
            title,
            completed: false,
        }),
    });
}

export function updateTodoCompleted(id, completed) {
    return request(`${BASE}/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
    });
}

export function deleteTodo(id) {
    return request(`${BASE}/todos/${id}`, {
        method: "DELETE",
    });
}
