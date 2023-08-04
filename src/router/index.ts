import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    meta:{
      isShow:false,
      title:""
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta:{
      isShow:false,
      title:""
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      isShow:false,
      title:""
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    meta:{
      isShow:false,
      title:"layout"
    },
    component: () => import('../views/layout.vue'),
    children:[
      {
        path: '/home',
        name: 'home',
        meta:{
          isShow:true,
          title:"首页"
        },
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/order',
        name: 'order',
        meta:{
          isShow:true,
          title:"订单管理"
        },
        // component: () => import('../views/order/index.vue'),
        children:[
          {
            path: '/list',
            name: 'list',
            meta:{
              isShow:true,
              title:"订单列表"
            },
            component: () => import('../views/order/list/index.vue'),
          }
        ]
      }
    ],
  },
]

const routers = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default routers
