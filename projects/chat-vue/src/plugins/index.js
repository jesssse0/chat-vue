import * as cfwJslib from '@auto/cfwJslib';
import flexible from './flexible';

const MyPlugins = {
  install(Vue) {
    const cfwObj = cfwJslib.init();
    Object.keys(cfwObj).forEach((fn) => {
      Object.defineProperty(Vue.prototype, `${fn}`, {
        get() {
          return cfwObj[fn];
        },
        configurable: true,
      });
    });

    Vue.directive('throttle', {
      bind(el, binding) {
        let prev = Date.now();
        el.addEventListener(
          'click',
          () => {
            const now = Date.now();
            if (now - prev > 1000) {
              binding.value();
              prev = now;
            }
          },
          false
        );
      },
    });

    Vue.filter('formatUrl', (url) => {
      if (!url) {
        return '';
      }
      return url.replace(/^http:\/\/|https:\/\//, '//');
    });

    flexible.changeRem();
  },
};

export default MyPlugins;
