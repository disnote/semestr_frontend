<template>
    <div class="routing-app">
        <header class="header">
            <h1>ToDo · Routing · Pinia</h1>
            <nav class="nav">
                <RouterLink to="/">Список (/)</RouterLink>
                <RouterLink to="/add">Добавить (/add)</RouterLink>
                <RouterLink to="/about">О нас (/about)</RouterLink>
            </nav>
            <p class="back">
                <a href="/">← ToDo с API</a>
                ·
                <a href="/registration.html">VeeValidate</a>
            </p>
        </header>

        <main class="main">
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.routing-app {
    width: min(100%, 36rem);
    margin: 0 auto;
    padding: 1.5rem 1rem;
}

.header h1 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
}

.nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
}

.nav a {
    color: #38bdf8;
    text-decoration: none;
    font-size: 0.95rem;
}

.nav a.router-link-active {
    font-weight: 700;
    text-decoration: underline;
}

.back {
    margin: 0.75rem 0 0;
    font-size: 0.85rem;
    color: #94a3b8;
}

.back a {
    color: #94a3b8;
}

.main {
    margin-top: 1.25rem;
    padding: 1rem;
    border-radius: 12px;
    background: #0f172a;
    border: 1px solid #334155;
}
</style>
