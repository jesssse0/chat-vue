import { get, post } from './request';
import { CHATGPT_HOST } from './host.config';

const paths = {
  login: `${CHATGPT_HOST}/openapi/user/login`,
  getAnswer: `${CHATGPT_HOST}/openapi/chat/sendMsg`,
};

export const login = (params = {}) => post(paths.login,params);
export const getAnswer = (params = {}) => post(paths.getAnswer,params);

export const sendCouponMobileCode = (params = {}) => get(paths.sendCouponMobileCode, params);
export const exchageCoupon = (params = {}) => post(paths.exchageCoupon, params, 'form');


export default {
  sendCouponMobileCode,
  exchageCoupon,
    login,
    getAnswer
};
