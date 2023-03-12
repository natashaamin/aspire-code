import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    redirect: { name: 'Login' }
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/home',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/home/index.vue')
      }
    ]
  },
  {
    path: '/credit',
    component: () => import('@/layouts/default.vue'),
    children: [{
      path:'',
      name: 'Credit',
      component: () => import('@/pages/credit/index.vue')
    }]
  },
  {
    path: '/payments',
    component: () => import('@/layouts/default.vue'),
    children: [{
      path:'',
      name: 'Payments',
      component: () => import('@/pages/payments/index.vue')
    }]
  },
  {
    path: '/cards',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Card',
        component: () => import('@/pages/cards/index.vue')
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('@/layouts/default.vue'),
    children: [{
      path:'',
      name: 'Profile',
      component: () => import('@/pages/profile/index.vue')
    }]
  }
]

export default routes
