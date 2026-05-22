<template>
    <section>
        <h2>О нас</h2>
        <p>
            Это учебное одностраничное приложение ToDo List с маршрутизацией
            Vue Router и хранением данных в <code>localStorage</code> (без сервера).
        </p>
        <p>
            Маршруты: <code>/</code> — список, <code>/add</code> — форма,
            <code>/task/:id</code> — задача,
            <code>/task/:id/complete</code> и <code>/task/:id/delete</code> —
            действия по URL.
        </p>
    </section>
</template>

<style scoped>
h2 {
    margin: 0 0 1rem;
}

p {
    line-height: 1.6;
    color: #cbd5e1;
}

code {
    background: #334155;
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
}
</style>
