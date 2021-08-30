import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import CreateProject from "../views/CreateProject.vue";
import EditProject from "../views/EditProject.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/manage",
    name:"Dashboard",
    component: Dashboard
  },
  {
    path: "/create",
    name: "Create Project",
    component: CreateProject
  },{
    path: "/edit/:id",
    name: "EditProject",
    component: EditProject
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
