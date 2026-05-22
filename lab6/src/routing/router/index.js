import { createRouter, createWebHashHistory } from "vue-router";
import TodoListView from "../views/TodoListView.vue";
import AddTaskView from "../views/AddTaskView.vue";
import TaskDetailView from "../views/TaskDetailView.vue";
import TaskDeleteView from "../views/TaskDeleteView.vue";
import TaskCompleteView from "../views/TaskCompleteView.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
    { path: "/", name: "home", component: TodoListView },
    { path: "/add", name: "add", component: AddTaskView },
    { path: "/about", name: "about", component: AboutView },
    {
        path: "/task/:id/delete",
        name: "task-delete",
        component: TaskDeleteView,
        props: true,
    },
    {
        path: "/task/:id/complete",
        name: "task-complete",
        component: TaskCompleteView,
        props: true,
    },
    {
        path: "/task/:id",
        name: "task-detail",
        component: TaskDetailView,
        props: true,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
