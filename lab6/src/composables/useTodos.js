import { computed, ref, watch } from "vue";
import {
    createTodo,
    deleteTodo,
    fetchTodos,
    updateTodoCompleted,
} from "../api/todosApi.js";

const STORAGE_KEY = "lab6-todos-v1";

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function saveToStorage(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function normalizeTodo(todo) {
    return {
        id: Number(todo.id),
        userId: todo.userId ?? 1,
        title: todo.title,
        completed: Boolean(todo.completed),
    };
}

export function useTodos() {
    const todos = ref([]);
    const initializing = ref(false);
    const syncing = ref(false);
    const error = ref(null);

    const loading = computed(() => initializing.value || syncing.value);

    async function init() {
        initializing.value = true;
        error.value = null;

        const cached = loadFromStorage();
        if (cached && cached.length > 0) {
            todos.value = cached.map(normalizeTodo);
            initializing.value = false;
            return;
        }

        try {
            const data = await fetchTodos();
            todos.value = data.slice(0, 10).map(normalizeTodo);
            saveToStorage(todos.value);
        } catch (e) {
            error.value =
                e.message ?? "Не удалось загрузить задачи. Можно добавить новую вручную.";
            todos.value = [];
        } finally {
            initializing.value = false;
        }
    }

    watch(todos, (value) => saveToStorage(value), { deep: true });

    async function addTodo(title) {
        const trimmed = title.trim();
        if (!trimmed) return;

        syncing.value = true;
        error.value = null;

        try {
            const created = await createTodo(trimmed);
            let id = created?.id ?? Date.now();
            if (todos.value.some((t) => t.id === id)) {
                id = Date.now();
            }
            todos.value = [
                normalizeTodo({ ...created, id, title: trimmed }),
                ...todos.value,
            ];
        } catch (e) {
            error.value = e.message ?? "Не удалось добавить задачу";
            throw e;
        } finally {
            syncing.value = false;
        }
    }

    async function toggleTodo(id) {
        const numId = Number(id);
        const todo = todos.value.find((t) => t.id === numId);
        if (!todo) return;

        syncing.value = true;
        error.value = null;
        const next = !todo.completed;

        try {
            await updateTodoCompleted(numId, next);
            todo.completed = next;
        } catch (e) {
            error.value = e.message ?? "Не удалось обновить задачу";
            throw e;
        } finally {
            syncing.value = false;
        }
    }

    async function removeTodo(id) {
        const numId = Number(id);
        if (!Number.isFinite(numId)) return;

        syncing.value = true;
        error.value = null;

        try {
            await deleteTodo(numId);
            todos.value = todos.value.filter((t) => t.id !== numId);
        } catch (e) {
            error.value = e.message ?? "Не удалось удалить задачу";
            throw e;
        } finally {
            syncing.value = false;
        }
    }

    return {
        todos,
        loading,
        initializing,
        syncing,
        error,
        init,
        addTodo,
        toggleTodo,
        removeTodo,
    };
}
