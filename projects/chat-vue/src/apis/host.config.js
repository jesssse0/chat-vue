import { isProd } from '@/utils';

export const CFW_YC_HOST = isProd ? 'https://cfwyc.api.autohome.com.cn' : 'http://cfwyc.terra.corpautohome.com';
export const CFW_COUPON_HOST = isProd ? 'https://chefuwu.autohome.com.cn' : 'http://couponapi.yz.test.autohome.com.cn';
export const CFW_ORDER_HOST = isProd ? 'https://chefuwu.autohome.com.cn' : 'http://orderapi.yz.test.autohome.com.cn';
export const CFW_AV_HOST = isProd ? 'https://chefuwu.autohome.com.cn/accapi' : 'http://av.yz.test.autohome.com.cn';
export const CFW_ACTIVITY_HOST = isProd ? 'https://chefuwu.autohome.com.cn' : 'http://activityweb.yz.test.autohome.com.cn';
export const YCZJ_HOST = isProd ? 'https://yczj.m.autohome.com.cn' : 'http://test.yczj.m.autohome.com.cn';
export const YOUCHE_HOST = isProd ? 'https://youche.m.autohome.com.cn' : 'http://youche-h5.yz.test.autohome.com.cn';
export const WZ_HOST = isProd ? 'https://wz.autohome.com.cn/explosion' : 'https://wz.autohome.com.cn/explosion';

export const CHATGPT_HOST = isProd ? 'https://wz.autohome.com.cn/explosion' : 'https://43.143.212.10:9212';

export default {
  CFW_YC_HOST,
  CFW_COUPON_HOST,
  CFW_ORDER_HOST,
  CFW_AV_HOST,
  CFW_ACTIVITY_HOST,
  YCZJ_HOST,
  YOUCHE_HOST,
  WZ_HOST
};
