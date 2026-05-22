<template>
    <section class="message">
        <p class="notice">Task status has been changed</p>
        <RouterLink v-if="todo" :to="`/task/${todo.id}`">
            Открыть задачу #{{ todo.id }}
        </RouterLink>
        <RouterLink to="/" class="back">← К списку задач</RouterLink>
    </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTodosStore } from "../../pinia/stores/todosStore.js";
import { resolveRouteId } from "../utils/resolveRouteId.js";

const store = useTodosStore();

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
});

const route = useRoute();
const todoId = computed(() => resolveRouteId(props, route));
const todo = computed(() => store.getTodoById(todoId.value));

onMounted(() => {
    if (Number.isFinite(todoId.value)) {
        store.toggleTodoById(todoId.value);
    }
});
</script>

<style scoped>
.message {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
}

.notice {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4ade80;
    margin: 0;
}

a {
    color: #38bdf8;
}

.back {
    font-size: 0.9rem;
}
</style>
