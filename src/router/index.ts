import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/layout'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isShow: false,
      title: ""
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    meta: {
      isShow: false,
      title: "layout"
    },
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          isShow: true,
          title: "首页"
        },
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/order',
        name: 'order',
        meta: {
          isShow: true,
          title: "订单管理"
        },
        // component: () => import('../views/order/index.vue'),
        children: [
          {
            path: '/list',
            name: 'list',
            meta: {
              isShow: true,
              title: "订单列表"
            },
            component: () => import('../views/order/list/index.vue'),
          },
          {
            path: '/list/detail',
            name: 'list-detail',
            meta: {
              isShow: false,
              title: "订单详情"
            },
            component: () => import('../views/order/list/detail/index.vue'),
          }
        ]
      }
    ],
  },
]


//创建路由对象
const routers = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//全局路由守卫
routers.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token')
  if (to.path != '/login' && !token) {
    next('/login');
  } else {
    console.log("token");
    next();
  }
});


export default routers
