import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import ListView from "./components/ListView.vue";
import AboutView from "./components/AboutView.vue";
import WrongPathView from "./components/WrongPathView.vue";
import SecretView from "./components/SecretView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/list", component: ListView },
    { path: "/about", component: AboutView },
    { path: "/secret", component: SecretView },
    { path: "/:pathMatch(.*)*", component: WrongPathView },
  ],
});

export default router;
