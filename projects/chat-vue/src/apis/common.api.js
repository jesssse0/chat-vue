import { get, post } from './request';
import { CFW_AV_HOST, CFW_COUPON_HOST, CFW_ACTIVITY_HOST, WZ_HOST } from './host.config';

const paths = {
  // 支付宝小程序，微信小程序，高德小程序，解密miniProgramSession，在前端set-cookie: pcpopclub
  getMiniProgramUserSign: `${WZ_HOST}/expand/OwnersDay/ashx/GetUserSign.ashx`,
  getUserInfo: `${CFW_AV_HOST}/repair/login/detail`,
  sendMobileCode: `${CFW_COUPON_HOST}/couponapi/couponsms/sendmobilecode.do`,
  sendCouponMobileCode: `${CFW_COUPON_HOST}/couponapi/wechat/sendmobilecode.do`,
  exchageCoupon: `${CFW_COUPON_HOST}/couponapi/wechat/exchange.do`,
  getActivityInfo: `${CFW_ACTIVITY_HOST}/activity/yx/getActivityInfo`,
  getServerTime: `${CFW_ACTIVITY_HOST}/activity/api/welfare/getTime`,
};

export const getMiniProgramUserSign = (params = {}) => get(paths.getMiniProgramUserSign);
export const getUserInfo = (params = {}) => get(paths.getUserInfo, params);
export const sendMobileCode = (params = {}) => get(paths.sendMobileCode, params);
export const sendCouponMobileCode = (params = {}) => get(paths.sendCouponMobileCode, params);
export const exchageCoupon = (params = {}) => post(paths.exchageCoupon, params, 'form');
export const getActivityInfo = (params = {}) => get(paths.getActivityInfo, params);
export const getServerTime = (params = {}) => get(paths.getServerTime, params);

export default {
  getMiniProgramUserSign,
  getUserInfo,
  sendMobileCode,
  sendCouponMobileCode,
  exchageCoupon,
  getActivityInfo,
  getServerTime,
};
