import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";

import Home from "./views/Home.vue";
import Alumnos from "./views/Alumnos.vue";
import Cursos from "./views/Cursos.vue";

const routes = [
  { path: "/home", component: Home },
  { path: "/alumnos", component: Alumnos },
  { path: "/cursos", component: Cursos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
