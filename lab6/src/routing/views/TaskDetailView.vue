<template>
    <section v-if="todo">
        <h2>Задача #{{ todo.id }}</h2>
        <p class="title">{{ todo.title }}</p>
        <p class="status">
            Статус:
            <strong>{{ todo.completed ? "выполнена" : "не выполнена" }}</strong>
        </p>
        <div class="actions">
            <RouterLink :to="`/task/${todo.id}/complete`" class="link">
                /task/{{ todo.id }}/complete
            </RouterLink>
            <RouterLink :to="`/task/${todo.id}/delete`" class="link danger">
                /task/{{ todo.id }}/delete
            </RouterLink>
        </div>
    </section>
    <section v-else>
        <p class="empty">Задача не найдена.</p>
    </section>
</template>

<script setup>
import { computed } from "vue";
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
</script>

<style scoped>
.title {
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
}

.status {
    color: #cbd5e1;
}

.actions {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.link {
    color: #60a5fa;
}

.link.danger {
    color: #f87171;
}

.empty {
    color: #94a3b8;
}
</style>
