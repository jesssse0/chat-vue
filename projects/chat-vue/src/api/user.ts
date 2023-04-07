import http from './http'

// 登录接口
const login = (params:object) => {
  return http.request({
    url: `/openapi/user/login`,
    method: 'post',
    data: params
  })
}

// 查询个人信息
const getUserInfo = (token:string|null) => {
  return http.request({
    url: `/openapi/user/info`,
    headers: {
      isToken: token ? true : false
    },
    method: 'post',
    data: {
      token: ''
    }
  })
}

// 用户注册
const register = (dataObj:object) => {
  return http.request({
    url: `/openapi/user/signUp`,
    headers: {
      isToken: true
    },
    method: 'post',
    data: dataObj
  })
}

// 发送验证码
const sendCode = (dataObj:object) => {
  return http.request({
    url: `/openapi/user/sendCode`,
    headers: {
      isToken: true
    },
    method: 'post',
    data: dataObj
  })
}

export default {
  login,
  getUserInfo,
  register,
  sendCode
}