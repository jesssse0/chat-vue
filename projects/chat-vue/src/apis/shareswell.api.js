import { get, post } from './request';
import { CFW_ACTIVITY_HOST } from './host.config';

const paths = {
    getGrabCouponList: `${CFW_ACTIVITY_HOST}/activity/yxcoupon/getGrabCouponList`,
    addRemind: `${CFW_ACTIVITY_HOST}/activity/api/welfare/addRemind`,
    getBulkCouponList: `${CFW_ACTIVITY_HOST}/activity/yxcoupon/getBulkCouponList`,
    takeCoupon: `${CFW_ACTIVITY_HOST}/activity/yxcoupon/take`,
    createKouLing: `${CFW_ACTIVITY_HOST}/activity/yxcoupon/bulkshare`,
};

// wiki：http://wiki.corpautohome.com/plugins/servlet/mobile?contentId=232256311#content/view/232256311
// 对接人：申之铭
export const getGrabCouponList = (params = {}) => get(paths.getGrabCouponList, params);
export const getBulkCouponList = (params = {}) => get(paths.getBulkCouponList, params);
export const takeCoupon = (params = {}) => post(paths.takeCoupon, params, 'form');
export const createKouLing = (params = {}) => post(paths.createKouLing, params, 'form');

// wiki:http://wiki.corpautohome.com/pages/viewpage.action?pageId=232255920
// 对接人：杨炎伟
export const addRemind = (params = {}) => get(paths.addRemind, params);


export default {
    getGrabCouponList,
    addRemind,
    getBulkCouponList,
    takeCoupon,
    createKouLing,
};
