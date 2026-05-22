# Routing — Lab 6

SPA ToDo List: **Vue Router** + **Pinia** + **localStorage** (без API).

## Запуск

**http://localhost:5176/routing.html** (после `npm run dev` в `lab6`)

## Маршруты

| URL | Описание |
|-----|----------|
| `/` | Список задач |
| `/add` | Форма добавления |
| `/task/:id` | Одна задача |
| `/task/:id/delete` | Удаление → **Task deleted** |
| `/task/:id/complete` | Смена статуса → **Task status has been changed** |
| `/about` | О нас |

## Pinia

Состояние в `src/pinia/stores/todosStore.js`. Изменения только через **actions**: `addTodo`, `deleteTodoById`, `toggleTodoById`. См. [pinia/README.md](../pinia/README.md).
