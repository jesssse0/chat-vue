import Vue from 'vue';
import Toast from 'vant/lib/toast';
import 'vant/lib/toast/style';
import { loadScript } from '@utils/loadSource.js';
import { isProd } from '@/utils';
import App from './App.vue';
import router from './router';
import plugins from './plugins';

// TODO 仅限测试环境
if (!isProd || window.location.href.includes('testFlag')) {
  loadScript('https://unpkg.com/vconsole@3.14.7/dist/vconsole.min.js').then(() => {
    // eslint-disable-next-line
    const vConsole = new VConsole();
    console.log(vConsole);
  });
}

// 全局toast
Vue.use(Toast);
Vue.prototype.$toast = Toast;
Vue.use(plugins);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
