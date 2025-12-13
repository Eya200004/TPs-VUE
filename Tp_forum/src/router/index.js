import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import DiscussionPage from "../pages/DiscussionPage.vue";
import CreateDiscussion from "../pages/CreateDiscussion.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/profile/:id?", component: ProfilePage },
  { path: "/category/:id", component: CategoryPage },
  { path: "/discussion/:id", component: DiscussionPage },
  { path: "/create-discussion", component: CreateDiscussion }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
