<template>
  <section class="form-container">
    <h3 class="title">领取车主福利</h3>
    <div class="form-wrapper">
      <!--  手机号码  -->
      <div class="form-cell">
        <div class="form-cell-label">手机号码</div>
        <div class="form-cell-content">
          <input
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="mobile"
            @keyup="onMobileChange"
            @blur="onMobileBlur"
            @focus="onMobileFocus"
          />
        </div>
        <div class="form-cell-ft">
          <van-popover v-model="showPopover" theme="dark" trigger="click" placement="top-end" :offset="[21, 15]">
            <div class="encrypt-tip">
              手机号加密处理 <i class="icon-close-popover" @click="showPopover = false"></i>
            </div>
            <template #reference>
              <i class="icon-tips"></i>
            </template>
          </van-popover>
          <i class="icon-cancel" @click="onClearMobile"></i>
        </div>
      </div>

      <!--  验证码  -->
      <div class="form-cell" v-show="isShowVerifyCode">
        <div class="form-cell-label">验证码</div>
        <div class="form-cell-content">
          <input
            type="tel"
            placeholder="请输入验证码"
            maxlength="6"
            v-model="verifyCode"
            @keyup="onVerifyCodeChange"
            @blur="onVerifyCodeBlur"
          />
        </div>
        <div class="form-cell-ft">
          <div class="btn-get-code" :class="{ disabled: !verifiable }" v-throttle="getVerifyCode">
            {{ verifyBtnText }}
          </div>
        </div>
      </div>
    </div>
    <img class="display-coupon" v-if="couponImg" :src="couponImg" alt="" />
    <div class="btn-wrapper">
      <div class="btn btn-use" v-throttle="verifyParams">{{ submitText }}</div>
      <label class="user-policy">
        <input type="checkbox" v-model="privatePolicy" />
        <span class="icon-check"></span>
        <div class="policy-text">
          已阅读并同意<a @click.prevent="openProtocol('personal')">《个人信息保护说明》</a>和<a @click.prevent="openProtocol('privacy')">《汽车之家隐私政策》</a>
        </div>
      </label>
    </div>
  </section>
</template>

<script>
import { RED_COUPON_INPUT_MOBILE, RED_COUPON_GET_SMS_CODE, RED_COUPON_TAKE_COUPON } from '@data/statistic';
import { sendMobileCode } from '@apis/common.api';
import { protocolObj } from '@data';
import { Track } from '@utils';
import { Popover } from 'vant';
import { isJSON } from '@utils/stringHelper';

export default {
  name: 'Form',
  components: {
    [Popover.name]: Popover,
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          isLogin: false,
          userMobile: ''
        };
      },
    },
    activityInfo: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  data() {
    return {
      mobile: '',
      mobileCopy: '',
      verifyCode: '',
      lastSecond: 60,
      verifyBtnText: '获取验证码',
      verifiable: true,
      privatePolicy: false,
      showPopover: false,
      isAutoApp: this.CfwEnvService.isAutoApp(),
    };
  },
  computed: {
    userMobile() {
      return this.userInfo.userMobile;
    },
    isShowVerifyCode() {
      return !this.userMobile || this.userMobile !== this.mobileCopy;
    },
    submitText() {
      const { submitText = '立即领取' } = this.activityInfo;
      return submitText;
    },
    couponImg() {
      let { couponImg } = this.activityInfo;
      couponImg = isJSON(couponImg) ? JSON.parse(couponImg) : '';
      if (Array.isArray(couponImg) && couponImg.length > 0) {
        [couponImg] = couponImg;
      }
      return couponImg;
    },
  },
  watch: {
    // 不显示验证码，验证码设为空
    isShowVerifyCode(val) {
      if (!val) {
        this.verifyCode = '';
      }
    },
    userMobile: {
      handler(val) {
        console.log('执行这里初始化手机号');
        this.mobile = val.replace(/(\d{3})\d{4}(\d{4})/g, '$1****$2');
        this.mobileCopy = val;
      },
      immediate: true,
    }
  },
  created() {},
  methods: {
    openProtocol(type) {
      // personal -> 用户协议，privacy -> 隐私政策
      this.CfwEnvService.open(protocolObj[type]);
    },
    verifyParams() {
      Track.pvClick.call(this, RED_COUPON_TAKE_COUPON);
      // TODO 暂时不校验登录
      // if (!this.userInfo.isLogin && this.isAutoApp) {
      //   this.$emit('go-login');
      //   return;
      // }
      if (!this.mobileCopy) {
        this.$toast('请输入手机号');
        return;
      }
      if (!/1[3-9]\d{9}/g.test(this.mobileCopy)) {
        this.$toast('请输入正确的手机号');
        return;
      }
      if (this.isShowVerifyCode && !this.verifyCode) {
        this.$toast('请输入验证码');
        return;
      }
      if (!this.privatePolicy) {
        this.$toast('请阅读并同意协议');
        return;
      }
      this.$emit('take-coupon', {
        mobile: this.mobileCopy,
        mobileCode: this.verifyCode,
      });
    },
    async getVerifyCode() {
      if (!this.verifiable) return false;
      this.verifiable = false;
      try {
        const { returncode, message } = await sendMobileCode({ mobile: this.mobileCopy });
        if (returncode === 0) {
          // 执行倒计时操作
          this.verifyBtnText = '60s';
          this.countDown();
        } else {
          this.verifiable = true;
          this.$toast(message || '获取验证码失败，请稍后处理');
        }
      } catch (e) {
        this.verifiable = true;
        this.$toast(e.message || '获取验证码失败，请稍后处理');
      }
      return true;
    },
    countDown() {
      setTimeout(() => {
        this.lastSecond -= 1;
        if (this.lastSecond > 0) {
          this.verifyBtnText = `${this.lastSecond}s`;
          this.countDown();
        } else {
          this.verifiable = true;
          this.verifyBtnText = '重新获取';
          this.lastSecond = 60;
        }
      }, 1000);
    },
    onVerifyCodeChange(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '');
    },
    onVerifyCodeBlur() {
      Track.pvClick.call(this, RED_COUPON_GET_SMS_CODE);
    },
    onMobileChange(e) {
      // 输入校验
      e.target.value = e.target.value.replace(/[^\d]/g, '');
      this.mobileCopy = e.target.value;
    },
    onMobileBlur() {
      if (this.mobileCopy.length === 11) {
        this.mobile = this.mobileCopy.replace(/(\d{3})\d{4}(\d{4})/g, '$1****$2');
      }
    },
    onMobileFocus() {
      Track.pvClick.call(this, RED_COUPON_INPUT_MOBILE);
      this.mobile = this.mobileCopy;
    },
    onClearMobile() {
      this.mobile = '';
      this.mobileCopy = '';
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../../assets/style/core/_reset.scss';
$imgPath: '~@assets/images/redcoupon/';
.form-container {
  margin-bottom: pr(32);
  background-color: #fff;
  border-radius: pr(12);
  padding: 0 pr(32) pr(40);
  box-sizing: border-box;

  .title {
    height: pr(120);
    font-size: pr(40);
    color: #930800;
    font-weight: bold;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url($imgPath + 'title-bg.png') center center no-repeat;
    background-size: pr(448) pr(28);
  }

  .form-wrapper {
    margin-bottom: pr(20);
    background-color: #f8f9fc;
    padding: 0 pr(32);
    box-sizing: border-box;
    border-radius: pr(8);
  }
  .form-cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: pr(100);

    .form-cell-label {
      margin-right: pr(28);
      width: pr(132);
      font-size: pr(32);
      color: #111e36;
      text-align: justify;
    }

    .form-cell-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      input {
        width: 100%;
        font-size: pr(32);
        background: transparent;
        border: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        &::-webkit-input-placeholder {
          color: #c5cad4;
        }
        &::-moz-placeholder {
          color: #c5cad4;
        }
        &:-ms-input-placeholder {
          color: #c5cad4;
        }
      }
    }

    .form-cell-ft {
      margin-left: pr(20);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .icon-tips {
    display: block;
    width: pr(26);
    height: pr(32);
    background: url('//x.autoimg.cn/cfw/cfw/baoyang/icon-baohu2.png') no-repeat;
    background-size: 100% 100%;
  }

  .icon-cancel {
    margin-left: pr(20);
    display: block;
    width: pr(32);
    height: pr(32);
    background: url('//s.autoimg.cn/dealer/m/sj/live/icon_list_close.png') no-repeat center center;
    background-size: 100% 100%;
  }

  .btn-get-code {
    font-size: pr(28);
    color: #206cfe;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    &.disabled {
      color: #c5cad4;
      font-weight: 400;
    }
  }

  .show-img {
    margin-bottom: pr(40);
    height: 150px;
  }

  .display-coupon {
    margin-bottom: pr(32);
    display: block;
    width: 100%;
  }

  .btn-wrapper {
    .btn {
      width: 100%;
      height: pr(88);
      border-radius: pr(48);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: pr(36);
      font-weight: 500;

      &.btn-use {
        background-color: #ee3d29;
        background-image: radial-gradient(at 130% 10%, #ffc35c 10%, rgba(255, 172, 107, 0) 80%),
          linear-gradient(90deg, #fe4242 0%, #ee3d29 100%);
        box-shadow: inset pr(2) pr(-6) pr(10) 0 rgba(255, 255, 255, 0.3);
        color: #fff;
      }
    }

    .user-policy {
      margin-top: pr(28);
      font-size: pr(22);
      color: #666c80;
      line-height: pr(28);
      text-align: center;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      input {
        display: none;
      }
      input + span {
        display: block;
        margin-right: pr(8);
        width: pr(24);
        height: pr(24);
        background: url($imgPath + 'icon-unselected.png') no-repeat;
        background-size: 100% 100%;
      }
      input:checked + span {
        background-image: url($imgPath + 'icon-selected.png');
      }

      .policy-text {
        flex: 1;
        text-align: center;
      }
      a {
        color: #ff5648;
      }
    }
  }
}
</style>
<style lang="scss">
.encrypt-tip {
  height: pr(64);
  // background-color: rgba(17,30,54,0.7);
  font-size: pr(24);
  color: #fff;
  padding-left: pr(20);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .icon-close-popover {
    margin: pr(22);
    display: block;
    width: pr(24);
    height: pr(24);
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA9klEQVRIS8VVwQ3CMAy8SPnBHDBFB6A/RoiU7MAI7JBIHYEfDMAUMEf7i1QUqa3S0DZuJUOeyflOjs+2APMRzPwYBJxz17ZtzwC0Mea5RdhaWwBwQoib1voSOAYBa+0LwAFALaUslVKrRKqqKrz3dwB7AG9jzDEVCOo9YJVIQl4DKPtfGNUgBVIyycV8FTkXENeGgp10ESWQghnVIHXNEgGVfFEgPE4RhfvILVkzZBstEWm6THdUO2cFokweAAJxOI2U8kTplf8LsH4Ra5FZbUrxOQUz2QfUwLk+SZ31u2HXLQu+cc2+cNhX5pYdTIkhjQoK0RzmAyi7Jih5qqG2AAAAAElFTkSuQmCC')
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>
