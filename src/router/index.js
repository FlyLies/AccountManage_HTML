import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'bg',
    component: () => import('../views/BackgroundView.vue'),
    redirect: '/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/RegisterView.vue')
      },
      {
        path: 'web',
        name: 'web',
        component: () => import('../views/WebView.vue')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('../views/AccountView.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/UserView.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
