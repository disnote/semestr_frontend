<template>
    <div class="app">
        <header class="header">
            <h1>ToDo List</h1>
            <p class="subtitle">Vue 3 · Composition API · локальный API (/api)</p>
            <p class="nav-link">
                <a href="/routing.html">Routing (localStorage) →</a>
                ·
                <a href="/registration.html">VeeValidate →</a>
            </p>
        </header>

        <p v-if="error" class="error" role="alert">{{ error }}</p>

        <TodoForm ref="formRef" :disabled="syncing" @add="onAdd" />

        <p v-if="initializing" class="status">Загрузка списка…</p>
        <p v-else-if="syncing" class="status">Сохранение…</p>

        <TodoList
            :todos="todos"
            :disabled="syncing"
            @toggle="onToggle"
            @delete-request="openDeletePopup"
        />

        <Popup
            v-model:open="deletePopupOpen"
            confirm-label="Удалить"
            cancel-label="Отмена"
            @confirm="confirmDelete"
        >
            <h2 class="popup-title">Удалить задачу?</h2>
            <p v-if="todoToDelete" class="popup-text">
                «{{ todoToDelete.title }}» будет удалена безвозвратно.
            </p>
        </Popup>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTodos } from "./composables/useTodos.js";
import Popup from "./components/Popup.vue";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";

const {
    todos,
    error,
    initializing,
    syncing,
    init,
    addTodo,
    toggleTodo,
    removeTodo,
} = useTodos();

const deletePopupOpen = ref(false);
const todoToDelete = ref(null);
const formRef = ref(null);

onMounted(() => {
    init();
});

async function onAdd(title) {
    try {
        await addTodo(title);
        formRef.value?.clearInput();
    } catch {
        /* error уже в composable */
    }
}

async function onToggle(id) {
    try {
        await toggleTodo(id);
    } catch {
        /* error уже в composable */
    }
}

function openDeletePopup(todo) {
    todoToDelete.value = todo;
    deletePopupOpen.value = true;
}

async function confirmDelete() {
    const todo = todoToDelete.value;
    if (todo == null || !Number.isFinite(Number(todo.id))) return;
    try {
        await removeTodo(todo.id);
    } catch {
        /* error уже в composable */
    } finally {
        todoToDelete.value = null;
    }
}
</script>

<style scoped>
.app {
    width: min(100%, 32rem);
    padding: 1.5rem;
    border-radius: 16px;
    background: #0f172a;
    border: 1px solid #334155;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
}

.header {
    margin-bottom: 1.25rem;
}

.header h1 {
    margin: 0 0 0.25rem;
    font-size: 1.75rem;
}

.subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: #94a3b8;
}

.nav-link {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
}

.nav-link a {
    color: #38bdf8;
}

.error {
    margin: 0 0 1rem;
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    background: #450a0a;
    color: #fecaca;
    font-size: 0.9rem;
}

.status {
    margin: 0 0 0.75rem;
    font-size: 0.9rem;
    color: #94a3b8;
}

.popup-title {
    margin: 0 0 0.5rem;
    font-size: 1.15rem;
}

.popup-text {
    margin: 0;
    color: #cbd5e1;
    font-size: 0.95rem;
}
</style>
