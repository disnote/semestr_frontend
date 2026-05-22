<template>
    <section class="message">
        <p class="notice">Task deleted</p>
        <RouterLink to="/">← К списку задач</RouterLink>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
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

onMounted(() => {
    const id = resolveRouteId(props, route);
    if (Number.isFinite(id)) {
        store.deleteTodoById(id);
    }
});
</script>

<style scoped>
.message {
    text-align: center;
}

.notice {
    font-size: 1.25rem;
    font-weight: 600;
    color: #f87171;
    margin: 0 0 1rem;
}

a {
    color: #38bdf8;
}
</style>
