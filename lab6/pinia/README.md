# Pinia — Lab 6 (State management)

Модификация TodoList из части **Routing**: состояние в **Pinia**, изменения через **actions**.

## Где используется

Приложение **Routing** (`routing.html`):

- Store: `src/pinia/stores/todosStore.js`
- Подключение: `src/routing/main.js` → `app.use(createPinia())`

## Store `useTodosStore`

**State (реактивное):**

- `todos` — массив `{ id, title, completed }`, синхронизация с `localStorage` (`lab6-routing-todos`)

**Actions (изменение состояния):**

| Action | Назначение |
|--------|------------|
| `addTodo(title)` | Создать задачу с новым `id` |
| `deleteTodoById(id)` | Удалить |
| `toggleTodoById(id)` | Сменить `completed` |

**Чтение без изменения:**

- `getTodoById(id)` — найти задачу (для страниц `/task/:id`)

## Запуск

```bash
cd lab6
npm run dev
```

**http://localhost:5176/routing.html**
