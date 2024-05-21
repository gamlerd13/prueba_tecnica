import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";

import Home from "./views/Home.vue";
import Alumnos from "./views/Alumnos.vue";
import AlumnosList from "./views/AlumnosList.vue";
import AlumnoForm from "./views/AlumnoForm.vue";
import AlumnoEditForm from "./views/AlumnoEditForm.vue";
import AlumnoDetail from "./views/AlumnoDetail.vue";
import Cursos from "./views/Cursos.vue";
import CursoDetail from "./views/CursoDetail.vue";
import CursoForm from "./views/CursoForm.vue";
import CursoEditForm from "./views/CursoEditForm.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/alumnos", component: AlumnosList },
  { path: "/alumno/create", component: AlumnoForm },
  { path: "/alumno/:id/edit", component: AlumnoEditForm },
  { path: "/alumno/:id", component: AlumnoDetail },

  // curso
  { path: "/cursos", component: Cursos },
  { path: "/curso/create", component: CursoForm },
  { path: "/curso/:id/edit", component: CursoEditForm },
  { path: "/curso/:id", component: CursoDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
