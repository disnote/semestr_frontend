<template>
    <section>
        <h2>Все задачи</h2>
        <p v-if="todos.length === 0" class="empty">Задач пока нет.</p>
        <ul v-else class="list">
            <li v-for="todo in todos" :key="todo.id" class="item">
                <RouterLink :to="`/task/${todo.id}`" class="title">
                    {{ todo.title }}
                </RouterLink>
                <span class="badge" :class="{ done: todo.completed }">
                    {{ todo.completed ? "выполнена" : "активна" }}
                </span>
                <div class="actions">
                    <RouterLink :to="`/task/${todo.id}/complete`" class="link">
                        complete
                    </RouterLink>
                    <RouterLink :to="`/task/${todo.id}/delete`" class="link danger">
                        delete
                    </RouterLink>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTodosStore } from "../../pinia/stores/todosStore.js";

const store = useTodosStore();
const { todos } = storeToRefs(store);
</script>

<style scoped>
h2 {
    margin: 0 0 1rem;
}

.empty {
    color: #94a3b8;
}

.list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.item {
    padding: 0.75rem;
    border: 1px solid #334155;
    border-radius: 8px;
    background: #1e293b;
}

.title {
    font-weight: 600;
    color: #38bdf8;
    text-decoration: none;
}

.badge {
    display: inline-block;
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: #94a3b8;
}

.badge.done {
    color: #4ade80;
}

.actions {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.75rem;
}

.link {
    font-size: 0.85rem;
    color: #60a5fa;
}

.link.danger {
    color: #f87171;
}
</style>
