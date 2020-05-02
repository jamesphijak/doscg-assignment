import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FindXYZ from '../views/FindXYZ.vue'
import FindBC from '../views/FindBC.vue'
import FindBestRoute from '../views/FindBestRoute.vue'

Vue.use(VueRouter)

  const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/findxyz', name: 'FindXYZ', component: FindXYZ },
    { path: '/findbc', name: 'FindBC', component: FindBC },
    { path: '/findbestroute', name: 'FindBestRoute', component: FindBestRoute }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
