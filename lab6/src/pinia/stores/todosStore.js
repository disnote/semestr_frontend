import { defineStore } from "pinia";
import { ref, watch } from "vue";

const STORAGE_KEY = "lab6-routing-todos";

function normalizeTodo(todo) {
    return {
        id: Number(todo.id),
        title: String(todo.title ?? ""),
        completed: Boolean(todo.completed),
    };
}

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) return [];
        return parsed.map(normalizeTodo).filter((t) => Number.isFinite(t.id));
    } catch {
        return [];
    }
}

function saveToStorage(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export const useTodosStore = defineStore("todos", () => {
    const todos = ref(loadFromStorage());

    watch(todos, (list) => saveToStorage(list), { deep: true });

    function nextTodoId() {
        if (todos.value.length === 0) return 1;
        return Math.max(...todos.value.map((t) => t.id)) + 1;
    }

    /** Action: добавить задачу с id 1, 2, 3… */
    function addTodo(title) {
        const trimmed = title.trim();
        if (!trimmed) return null;

        const todo = normalizeTodo({
            id: nextTodoId(),
            title: trimmed,
            completed: false,
        });
        todos.value.push(todo);
        return todo;
    }

    function getTodoById(id) {
        const numId = Number(id);
        if (!Number.isFinite(numId)) return null;
        return todos.value.find((t) => t.id === numId) ?? null;
    }

    /** Action: удалить задачу */
    function deleteTodoById(id) {
        const numId = Number(id);
        if (!Number.isFinite(numId)) return;
        todos.value = todos.value.filter((t) => t.id !== numId);
    }

    /** Action: переключить выполненность */
    function toggleTodoById(id) {
        const numId = Number(id);
        if (!Number.isFinite(numId)) return null;
        const todo = todos.value.find((t) => t.id === numId);
        if (todo) {
            todo.completed = !todo.completed;
        }
        return todo ?? null;
    }

    return {
        todos,
        addTodo,
        getTodoById,
        deleteTodoById,
        toggleTodoById,
    };
});
