<template>
    <ul v-if="todos.length" class="todo-list">
        <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            :disabled="disabled"
            @toggle="$emit('toggle', $event)"
            @delete-request="$emit('delete-request', $event)"
        />
    </ul>
    <p v-else class="empty">Задач пока нет. Добавьте первую.</p>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";

defineProps({
    todos: {
        type: Array,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["toggle", "delete-request"]);
</script>

<style scoped>
.todo-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.empty {
    margin: 0;
    padding: 1rem;
    text-align: center;
    color: #94a3b8;
    background: #1e293b;
    border-radius: 8px;
    border: 1px dashed #475569;
}
</style>
