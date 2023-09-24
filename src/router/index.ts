import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("@/views/LoginView.vue"),
  // },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: () => import("@/views/RegisterView.vue"),
  // },
  // {
  //   path: "/forgot-password",
  //   name: "forgot-password",
  //   component: () => import("@/views/ForgotPasswordView.vue"),
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
