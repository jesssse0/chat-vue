import Vue from 'vue';
import VueRouter from 'vue-router';
import { init } from '@auto/cfwJslib';

const { setTitle } = init().CfwEnvService;
Vue.use(VueRouter);

const routes = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
    // 聊天
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat.vue'),
      meta: {
        title: '聊天',
      },
    },
  // 会员
  {
      path: '/member',
      name: 'member',
      component: () => import('../views/member/index.vue'),
      meta: {
        title: '会员',
      },
    },
  // 红包活动
  {
    path: '/redcoupon',
    name: 'redcoupon',
    component: () => import('../views/redcoupon.vue'),
    meta: {
      title: '汽车之家车主福利',
    },
  },
  // 膨胀领券活动
  {
    path: '/shareswell',
    name: 'shareswell',
    component: () => import('../views/shareswell/index.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/shareswell/result',
    name: 'result',
    component: () => import('../views/shareswell/result.vue'),
    meta: {
      title: '',
    },
  },
  // 权益礼包兑换
  {
    path: '/coupons/exchange',
    name: 'exchange',
    component: () => import('../views/coupons/coupon_exchange.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/coupons/exchange/success',
    name: 'exchange_success',
    component: () => import('../views/coupons/coupon_exchange_success.vue'),
    meta: {
      title: '',
    },
  },
  // 洗车券兑换
  {
    path: '/coupons/carwashexchange',
    name: 'exchange_carwash',
    component: () => import('../views/coupons/carwash_exchange.vue'),
    meta: {
      title: '',
    },
  },
  // 加油使用指南
  {
    path: '/oilguide',
    name: 'oilguide',
    component: () => import('../views/oilguide.vue'),
    meta: {
      title: '加油使用指南',
    },
  },
  // 打开系统浏览器
  {
    path: '/browser',
    name: 'browser',
    component: () => import('../views/browser.vue'),
    meta: {
      title: '汽车之家',
    },
  },
  // m站活动静态页
  {
    path: '/mactivity',
    name: 'mactivity',
    component: () => import('../views/mactivity.vue'),
    meta: {
      title: '汽车之家',
    },
  },
  // m站活动静态页 测试
  {
    path: '/midpage',
    name: 'midpage',
    component: () => import('../views/midpage.vue'),
    meta: {
      title: '汽车之家',
    },
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/error.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '*',
    redirect: '/error',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/topic/operation-activity/',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach((to, from, next) => {
  setTitle(to.meta.title || ' ');
  // 往cookie放sourceid
  if (to.query.sourceid) {
    // setCookie('sourceid', to.query.sourceid);
  }
  next();
});

export default router;
