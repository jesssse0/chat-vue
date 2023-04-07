import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//路由数组
const routes:Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "homeIndex",
    redirect: '/chat',
    component: () => import('../views/rootIndex.vue'),
    children: [{
      path: "/chat",
      name: "chat",
      component: () => import('../views/chat.vue')
    }],
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/login.vue'),
    meta: {
      title: 'chatGpt登录',
    }
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue'),
    meta: {
      title: 'chatGpt注册',
    }
  },
  {
    path: "/chat-h5",
    name: "chat-h5",
    component: () => import('../views/chat-h5-backup.vue')
  }
]

//路由对象
const router = createRouter({
  history: createWebHistory(),
  routes //上面的路由数组
})

//导出路由对象，在main.js中引用
export default router