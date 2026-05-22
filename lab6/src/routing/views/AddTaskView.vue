<template>
    <section>
        <h2>Добавить задачу</h2>
        <form class="form" @submit.prevent="submit">
            <input
                v-model="title"
                type="text"
                class="input"
                placeholder="Название задачи"
                maxlength="200"
            />
            <button type="submit" class="btn" :disabled="!title.trim()">
                Создать
            </button>
        </form>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTodosStore } from "../../pinia/stores/todosStore.js";

const router = useRouter();
const store = useTodosStore();
const title = ref("");

function submit() {
    const todo = store.addTodo(title.value);
    if (!todo) return;
    title.value = "";
    router.push(`/task/${todo.id}`);
}
</script>

<style scoped>
h2 {
    margin: 0 0 1rem;
}

.form {
    display: flex;
    gap: 0.5rem;
}

.input {
    flex: 1;
    padding: 0.6rem 0.75rem;
    border: 1px solid #475569;
    border-radius: 8px;
    background: #0f172a;
    color: #f8fafc;
}

.btn {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: #fff;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
