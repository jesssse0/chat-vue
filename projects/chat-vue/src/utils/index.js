import { init } from '@auto/cfwJslib';

export const isProd = window.location.protocol === 'https:';
// export const isProd = true;

export const isBrowser = typeof window !== 'undefined';

const { CfwEnvService, CfwCookie } = init();
const { isAutoApp } = CfwEnvService;
const { getCookie } = CfwCookie;

export const browserVersions = () => {
  const u = window.navigator.userAgent;
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
  };
};

/*
 * Track.pvPage.call(this, {siteId: 222, categoryId: 666, subCategoryId: 888}, { param1: 参数1 })
 * Track.pvClick.call(this, 'czb_activity_choose_city_click', { param1: 参数1 })
 * */
export const Track = {
  pvPage({ siteId = '', categoryId = '', subCategoryId = '' } = {}, custom = {}) {
    const { source = '', pvareaid = '' } = this.$route.query;
    this.PvTrack.pvPage(
      {
        site_id: siteId,
        category_id: categoryId,
        sub_category_id: subCategoryId,
      },
      {
        // 自定义参数
        source,
        pvareaid,
        ...custom,
      }
    );
  },
  pvClick(action, custom = {}) {
    const { source = '', pvareaid = '' } = this.$route.query;
    this.PvTrack.pvClick(action, {
      source,
      pvareaid,
      ...custom,
    });
  },
};

// 直接关闭当前页面 并跳转新页面 scheme是要跳转的链接，不传递就是直接关闭
export function popAndPushNext(scheme = '') {
  if (!isAutoApp() || !window.AHAPP) {
    return;
  }
  if (scheme.length > 0) {
    window.AHAPP.invokeNative('pop', {
      url: scheme,
      actiontype: 'present',
      showtype: 'push',
      success() {
        // 成功回调
      },
      fail() {
        // 失败回调
      },
    });
  } else {
    window.AHAPP.invokeNative('pop', {
      success() {
        // 成功回调
      },
      fail() {
        // 失败回调
      },
    });
  }
}

/**
 * 当前汽车之家版本是否支持某个版本
 * @param targetVersion: '11.28.5'
 * @return res: true(当前版本大于等于目标版本), res: false(当前版本小于目标版本)
 */
export const isCurrentSupport = (targetVersion) => {
  const targetVersionArr = targetVersion.split('.');
  const appCurVersion = getCookie('app_ver');
  if (!appCurVersion) {
    return false;
  }
  const currentVersionArr = appCurVersion.split('.');
  const l = targetVersionArr.length;
  let res = true;
  for (let i = 0; i < l; i += 1) {
    if (Number(targetVersionArr[i]) > Number(currentVersionArr[i])) {
      res = false;
      break;
    } else if (Number(targetVersionArr[i]) < Number(currentVersionArr[i])) {
      break;
    }
  }
  return res;
};

export const openSystemBrowser = ({ url = '', success: successCb, fail: failCb }) => {
  if (!isAutoApp() || !window.AHAPP) {
    if (typeof failCb === 'function') {
      failCb();
    }
    return;
  }
  window.AHAPP.invokeNative('openURL', {
    url,
    success: (res) => {
      if (typeof successCb === 'function') {
        successCb(res);
      }
    },
    fail: (err) => {
      if (typeof failCb === 'function') {
        failCb(err);
      }
    },
  });
};
