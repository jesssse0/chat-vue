import axios from 'axios';
import qs from 'qs';
/*
 * 1、基础配置统一设置
 * 2、返回统一拦截
 * 3、公共header参数处理
 * */

// 全局统一设置
const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
  withCredentials: true,
});
// instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

// 拦截器, TODO 这里这一步看着好像没什么用呢
// instance.interceptors.response.use((response) => {
//   // TODO 这里需要做些拦截操作
//   return response;
// }, (error) => Promise.reject(error));

export const get = (url, params) =>
  instance
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log('接口报错：', err);
      return Promise.reject(err);
    });

/*
 * type: json | form
 * */
export const post = (url, data, type = 'json', cookie = '') => {
  const headers = { 'Content-Type': 'application/json;charset=UTF-8' };
  let params = data;
  if (type === 'form') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    params = qs.stringify(data);
  }
  if (cookie) {
    headers.Cookie = cookie;
  }
  return instance
    .post(url, params, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log('接口报错：', err);
      return Promise.reject(err);
    });
};

export default {
  get,
  post,
  instance,
};
