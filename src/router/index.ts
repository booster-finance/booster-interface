import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import CreateProject from "../views/CreateProject.vue";
import EditProject from "../views/EditProject.vue";
import Landing from "../views/Landing.vue";
import Setup from "../views/Setup.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/setup",
    component: Setup
  },
  // {
  //   path: "/manage",
  //   name:"Dashboard",
  //   component: Dashboard
  // },
  {
    path: "/create",
    name: "Create",
    component: CreateProject
  },{
    path: "/edit/:id",
    name: "EditProject",
    component: EditProject,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
