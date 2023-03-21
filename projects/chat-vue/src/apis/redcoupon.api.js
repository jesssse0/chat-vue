import { get, post } from './request';
import { CFW_ACTIVITY_HOST, CFW_COUPON_HOST } from './host.config';

const paths = {
  getActivityInfo: `${CFW_ACTIVITY_HOST}/activity/yx/getActivityInfo`,
  getActivityStatus: `${CFW_COUPON_HOST}/couponapi/couponsms/getactivitystatus.do`,
  recordUserTakeCoupon: `${CFW_COUPON_HOST}/couponapi/couponsms/recordusertakecoupon.do`,
  rightsTakeCoupon: `${CFW_COUPON_HOST}/couponapi/qyzt/takecoupon.do`,
};

export const getActivityInfo = (params = {}) => get(paths.getActivityInfo, params);
export const getActivityStatus = (params = {}) => post(paths.getActivityStatus, params, 'form');
export const recordUserTakeCoupon = (params = {}) => get(paths.recordUserTakeCoupon, params);
export const rightsTakeCoupon = (params = {}) => post(paths.rightsTakeCoupon, params, 'form');

export default {
  getActivityInfo,
  getActivityStatus,
  recordUserTakeCoupon,
  rightsTakeCoupon,
};
