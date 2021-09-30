import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import CreateProject from "../views/CreateProject.vue";
import EditProject from "../views/EditProject.vue";
import Setup from "../views/Setup.vue";
import ProjectOverview from "../views/ProjectOverview.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      { name: "ProjectFunding",path: "funding", component: ProjectOverview },
      { name: "ProjectActive",path: "active", component: ProjectOverview },
      { name: "ProjectCompleted",path: "completed", component: ProjectOverview },
      { name: "ProjectCancelled",path: "cancelled", component: ProjectOverview },
      { path: "", redirect: "funding" },
    ],
  },
  {
    path: "/setup",
    component: Setup,
  },
  // {
  //   path: "/manage",
  //   name:"Dashboard",
  //   component: Dashboard
  // },
  {
    path: "/create",
    name: "Create",
    component: CreateProject,
  },
  {
    path: "/edit/:id",
    name: "EditProject",
    component: EditProject,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
