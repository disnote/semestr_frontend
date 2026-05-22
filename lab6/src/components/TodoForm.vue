<template>
    <form class="todo-form" @submit.prevent="submit">
        <input
            v-model="title"
            type="text"
            class="todo-input"
            placeholder="Новая задача…"
            :disabled="disabled"
            maxlength="200"
        />
        <button type="submit" class="btn-add" :disabled="disabled || !title.trim()">
            Добавить
        </button>
    </form>
</template>

<script setup>
import { ref } from "vue";

defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["add"]);

const title = ref("");

function submit() {
    const value = title.value.trim();
    if (!value) return;
    emit("add", value);
}

function clearInput() {
    title.value = "";
}

defineExpose({ clearInput });
</script>

<style scoped>
.todo-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.todo-input {
    flex: 1;
    padding: 0.65rem 0.85rem;
    border: 1px solid #475569;
    border-radius: 8px;
    background: #0f172a;
    color: #f8fafc;
    font-size: 1rem;
}

.todo-input:focus {
    outline: 2px solid #38bdf8;
    outline-offset: 1px;
}

.btn-add {
    padding: 0.65rem 1rem;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
}

.btn-add:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
