import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { todoApiPlugin } from "./server/todoApiPlugin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [vue(), todoApiPlugin()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
                registration: path.resolve(__dirname, "registration.html"),
                routing: path.resolve(__dirname, "routing.html"),
            },
        },
    },
    server: {
        port: 5176,
    },
});
