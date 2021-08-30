import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: "/",
    component: () => import("../Views/App/index.vue"),
    redirect: "/App/Home",
    children: [
      {
        path: "/App/Home",
        component: () => import("../Views/App/Home/index.vue"),
      }
    ]
  },


  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../Views/Error/NotFound"),
    redirect: "/",
  },

];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
