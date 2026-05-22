<template>
    <li class="todo-item" :class="{ done: todo.completed }">
        <label class="todo-check">
            <input
                type="checkbox"
                :checked="todo.completed"
                :disabled="disabled"
                @change="$emit('toggle', todo.id)"
            />
            <span class="todo-title">{{ todo.title }}</span>
        </label>
        <button
            type="button"
            class="btn-delete"
            :disabled="disabled"
            @click="$emit('delete-request', todo)"
        >
            Удалить
        </button>
    </li>
</template>

<script setup>
defineProps({
    todo: {
        type: Object,
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
.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 8px;
    background: #1e293b;
    border: 1px solid #334155;
}

.todo-item.done .todo-title {
    text-decoration: line-through;
    color: #94a3b8;
}

.todo-check {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex: 1;
    cursor: pointer;
}

.todo-title {
    word-break: break-word;
}

.btn-delete {
    flex-shrink: 0;
    padding: 0.35rem 0.65rem;
    border: none;
    border-radius: 6px;
    background: #7f1d1d;
    color: #fecaca;
    font-size: 0.85rem;
    cursor: pointer;
}

.btn-delete:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
