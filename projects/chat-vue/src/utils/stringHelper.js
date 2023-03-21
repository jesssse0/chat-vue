import { init } from '@auto/cfwJslib';

const {CfwEnvService}  = init();

export const isJSON = (value) => {
  if (typeof value === 'string') {
    try {
      const  obj = JSON.parse(value);
      if(typeof obj === 'object' && obj ){
        return true;
      }
      return false;
    } catch(e) {
      // console.log('JSON校验报错：', e);
      return false;
    }
  }
  return false;
}

/*
shouxianapp  小程序寿险渠道_H5  // 未投放
wechatapp    小程序非寿险渠道_H5 // 未投放
autohomeapp  汽车之家APP_H5
chezhuapp  车主版APP_原生 // 已下架
jinguanjiaapp  金管家APP_H5 // 未投放
pinganyinhang  平安口袋银行 // 未投放
*/
export const channelString = () => {
  if (CfwEnvService.isMainApp()) {
    return 'autohomeapp'
  }
  if (CfwEnvService.isAliMinProgram()) {
    return 'alipayminiprogram'; // todo 值待修改
  }
  return 'm';
}
