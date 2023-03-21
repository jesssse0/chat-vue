import { get, post } from './request';
import { CFW_ORDER_HOST, CFW_ACTIVITY_HOST } from './host.config';

const paths = {
  getWashCarCode: `${CFW_ORDER_HOST}/orderapi/exchangecode/getwashcarcode.do`,
  getBulkCouponList: `${CFW_ACTIVITY_HOST}/activity/yxcoupon/getBulkCouponList`,
  takeCoupon: `${CFW_ACTIVITY_HOST}/activity/yxcoupon/take`,
  createKouLing: `${CFW_ACTIVITY_HOST}/activity/yxcoupon/bulkshare`,
};

export const getWashCarCode = (params = {}) => get(paths.getWashCarCode, params);
export const getBulkCouponList = (params = {}) => get(paths.getBulkCouponList, params);
export const takeCoupon = (params = {}) => post(paths.takeCoupon, params, 'form');
export const createKouLing = (params = {}) => post(paths.createKouLing, params, 'form');

export default {
  getWashCarCode,
  getBulkCouponList,
  takeCoupon,
  createKouLing,
};
