<template>
  <div class="coupon_exchange_container">
    <div class="coupon_exchange_login_mask" v-show="!isLogin" @click="toLogin"></div>
    <div class="coupon_exchange_item_background">
      <div class="coupon_exchange_title">输入优惠券兑换码</div>
      <input class="coupon_exchange_input" placeholder="请输入优惠券码" v-model="couponCode" />
      <div
        v-if="isLogin"
        style="
           {
            display: flex;
            flex-direction: column;
          }
        "
      >
        <div class="coupon_exchange_content_items">
          <div class="coupon_exchange_content">手机号码</div>
          <div class="coupon_exchange_content_items" :style="{ marginLeft: '20px', flex: 1 }">
            {{ userInfo && userInfo.userPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}
          </div>
          <div class="coupon_exchange_hint_icon" @click="onPhoneHintCLick" />
        </div>
        <div style="height: 1px; background-color: #f8f9fc"></div>
        <div class="coupon_exchange_content_items">
          <div class="coupon_exchange_content">验证码</div>
          <input
            class="coupon_exchange_content_input"
            :style="{ flex: 1 }"
            placeholder="请输入验证码"
            maxlength="6"
            v-model="verifyCode"
            type="tel"
            @keyup="onVerifyCodeChange"
          />
          <div class="coupon_exchange_hint_text_color" @click="sendExchangeSmsCode">
            {{ codeBtnTitle }}
          </div>
        </div>
      </div>
      <div class="coupon_exchange_commit" @click="toExchangeCoupon">立即领取</div>

      <!--      <div class="coupon_exchange_explain_item" @click="toAgreePrivateInfo">-->
      <!--        <input type="checkbox" v-model="isAgreePrivateInfo"/>-->
      <!--        <span class="icon-check"></span>-->
      <!--        <div class="coupon_exchange_explain_item_content">我已阅读并同意<span-->
      <!--          style="color: #206BFE;" @click.stop="protocolClickUser">用户服务协议</span>和<span style="color: #206BFE;" @click.stop="protocolClick">隐私政策</span></div>-->
      <!--      </div>-->
    </div>
    <div class="coupon_exchange_item_background" style="margin-top: 0px">
      <div class="coupon_exchange_title">兑换说明</div>
      <div style="height: 1px; background-color: #f8f9fc; margin-top: 20px"></div>
      <div class="coupon_exchange_explain_item" v-for="(item, index) in explains" :key="index">
        <div class="coupon_exchange_explain_item_num">{{ index + 1 }}</div>
        <div class="coupon_exchange_explain_item_content">{{ item }}</div>
      </div>
    </div>
    <ExchangeCouponPop
      :visible="successPopVisible"
      title="兑换成功"
      content='您的兑换码兑换成功，请在"汽车之家App-我的-卡券"中点击查看'
      btntitle="查看优惠券"
      @btnClick="gotoViewConpon"
      @closeModal="closeSuccessPop"
    />
    <ExchangeCouponPop
      :visible="failPopVisible"
      title="兑换失败"
      :content="failContent"
      btntitle="我知道了"
      @btnClick="closeFailPop"
      @closeModal="closeFailPop"
    />
    <Loading :loadingObj="loadingObj" />
  </div>
</template>

<script>
import { getUserInfo, sendCouponMobileCode, exchageCoupon } from '../../apis/common.api';
import ExchangeCouponPop from '../../components/Business/ExchangeCoupon/ExchangeCouponPop.vue';
import { Track } from '../../utils';
import { QUANYI_EXCHANGE_PV, QUANYI_CHAKAN_CLICK, QUANYI_EXCHANGE_SUCCESS_SHOW } from '../../data/statistic';
import Loading from '../../components/Base/Loading.vue';
// import {protocolObj} from "../../data";

export default {
  name: 'coupon_exchange',
  components: {
    ExchangeCouponPop,
    Loading,
  },
  data() {
    // explains: 说明信息， 自动追加序号
    return {
      explains: [
        '在当前页面输入兑换码即可兑换车主权益代金券；',
        '一个兑换码仅可兑换一次，不可重复使用；',
        '兑换成功后，可以在“汽车之家APP﹣我的-卡券”中查看，并使用；',
        '优惠券请在有效期内使用，过期作废，有效期请在“我的-卡券”中查看；',
        '如有疑问请联系客服：400-961-6666;',
        '活动最终解释权归汽车之家所有。',
      ],
      isAgreePrivateInfo: false,
      isLogin: false,
      userInfo: undefined,
      codeBtnTitle: '获取验证码',
      currentTime: 61,
      intervalId: undefined,
      successPopVisible: false,
      failPopVisible: false,
      failContent: '',
      verifyCode: '',
      couponCode: '',
      loadingObj: {
        loadingState: 0,
        dataHint: '兑换中...',
      },
    };
  },
  created() {
    this.CfwEnvService.setTitle('汽车之家车主权益礼包');
    Track.pvPage.call(this, {
      siteId: 120,
      categoryId: 1468,
      subCategoryId: 24713,
    });
    getUserInfo()
      .then((res) => {
        if (res && res.returncode === 0 && res.result) {
          const userInfo = res.result;
          this.userInfo = userInfo;
          this.isLogin = userInfo.userId !== 0 && userInfo.userPhone && userInfo.userPhone.length === 11;
        } else {
          this.isLogin = false;
        }
      })
      .catch((e) => {
        this.isLogin = false;
      });
    Track.pvClick.call(this, QUANYI_EXCHANGE_PV);
  },
  destroyed() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    closeSuccessPop() {
      this.successPopVisible = false;
    },
    closeFailPop() {
      this.failPopVisible = false;
    },
    gotoViewConpon() {
      Track.pvClick.call(this, QUANYI_CHAKAN_CLICK);
      this.CfwEnvService.open({ name: 'https://athm.cn/x/tgWLW2c' });
    },
    // protocolClickUser() {
    //   const url = 'personal';
    //   window.location.href = protocolObj[url];
    // },
    // protocolClick() {
    //   const url = 'privacy';
    //   window.location.href = protocolObj[url];
    // },
    onVerifyCodeChange(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, ''); // 后边在手机上验证下
    },
    // toAgreePrivateInfo() {
    //   this.isAgreePrivateInfo = !this.isAgreePrivateInfo;
    // },
    toLogin() {
      if (this.CfwEnvService.isAutoApp()) {
        this.CfwEnvService.login({
          success() {
            window.location.reload();
          },
        });
      } else {
        // eslint-disable-next-line no-restricted-globals
        window.location.href = `https://account.m.autohome.com.cn/login?backurl=${encodeURIComponent(location.href)}`;
      }
    },
    onPhoneHintCLick() {
      this.$toast('此号码作为登录号码，不可修改！');
    },
    sendExchangeSmsCode() {
      if (!this.isLogin || this.codeBtnTitle !== '获取验证码') {
        return;
      }
      this.loadingObj.loadingState = 1;
      this.loadingObj.dataHint = '获取中...';
      console.log(`--${this.codeBtnTitle}`);
      let interval = null;
      const that = this;
      // 发送验证码
      sendCouponMobileCode({
        mobile: this.userInfo.userPhone,
        validcodetype: 3,
      })
        .then((result) => {
          this.loadingObj.loadingState = 0;
          if (!result || result.returncode !== 0) {
            this.$toast(result ? result.message : '获取失败，请稍后再试');
            this.resetSmsStatus();
            return;
          }
          interval = setInterval(() => {
            that.currentTime = this.currentTime - 1;
            that.codeBtnTitle = `${that.currentTime}s`;
            if (that.currentTime <= 0) {
              clearInterval(interval);
              that.resetSmsStatus();
            }
          }, 1000);

          this.intervalId = interval;
        })
        .catch((e) => {
          this.loadingObj.loadingState = 0;
          console.log(e);
        });
    },
    toExchangeCoupon() {
      if (!this.couponCode || this.couponCode.length <= 0) {
        this.$toast('请输入优惠券码');
        return;
      }
      if (!this.verifyCode || this.verifyCode.length <= 0) {
        this.$toast('请输入验证码');
        return;
      }
      // if (!this.isAgreePrivateInfo) {
      //   this.$toast('请先同意并同意用户协议和隐私政策');
      //   return;
      // }
      this.loadingObj.loadingState = 1;
      this.loadingObj.dataHint = '兑换中...';
      exchageCoupon({
        userId: this.userInfo.userId,
        mobile_code: this.verifyCode,
        rand_code: this.couponCode,
      })
        .then((res) => {
          this.loadingObj.loadingState = 0;
          if (!res || res.returncode !== 0) {
            this.failContent = '兑换失败，请确认券码是否正确';
            this.failPopVisible = true;
          } else {
            this.successPopVisible = true;
            Track.pvClick.call(this, QUANYI_EXCHANGE_SUCCESS_SHOW);
          }
        })
        .catch((e) => {
          this.loadingObj.loadingState = 0;
          this.failContent = '兑换失败，请确认券码是否正确';
          this.failPopVisible = true;
        });
    },

    resetSmsStatus() {
      this.codeBtnTitle = '获取验证码';
      this.currentTime = 61;
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon_exchange_login_mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.coupon_exchange_container {
  background-color: #f8f9fc;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.coupon_exchange_item_background {
  background: #ffffff;
  margin: pr(24);
  padding: pr(32);
  border-radius: pr(6);
  display: flex;
  flex-direction: column;
}

.coupon_exchange_input {
  margin-top: pr(40);
  background: #f8f9fc;
  border-radius: pr(6);
  outline-color: invert;
  outline-style: none;
  padding-left: pr(40);
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(32);
  color: #111e36;
  height: pr(100);

  &::placeholder {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(32);
    color: #bfc5d2;
  }
}

.coupon_exchange_title {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 16px;
  color: #111e36;
  text-align: center;
}

.coupon_exchange_commit {
  height: pr(88);
  margin-top: pr(20);
  background-image: linear-gradient(270deg, #206cfe 0%, #4c88ff 100%);
  border-radius: pr(8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(28);
  color: #ffffff;
  text-align: center;
}

.coupon_exchange_content_items {
  height: pr(88);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.coupon_exchange_content {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(32);
  color: #111e36;
}

.coupon_exchange_content_input {
  overflow: hidden;
  outline-color: invert;
  outline-style: none;
  padding-left: pr(40);
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(32);
  color: #111e36;
  height: pr(86);

  &::placeholder {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(32);
    color: #bfc5d2;
  }
}

.coupon_exchange_hint_text_color {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(28);
  color: #206cfe;
  text-align: right;
}

.coupon_exchange_hint_icon {
  height: pr(32);
  width: pr(32);
  background: url(../../assets/images/coupon_exchange/icon_notice_blue.png) center center;
  background-size: 100% 100%;
}

.coupon_exchange_agree_icon {
  height: pr(32);
  width: pr(32);
  background: url(../../assets/images/coupon_exchange/icon_exchange_select.png) center center;
  background-size: 100% 100%;
}

.coupon_exchange_agree_selected_icon {
  height: pr(32);
  width: pr(32);
  background: url(../../assets/images/coupon_exchange/icon_exchange_selected.png) center center;
  background-size: 100% 100%;
}

.coupon_exchange_explain_item {
  margin-top: pr(30);
  display: flex;
  flex-direction: row;

  input {
    display: none;
  }

  input + span {
    display: block;
    margin-right: pr(8);
    width: pr(24);
    height: pr(24);
    background: url('../../assets/images/coupon_exchange/icon_exchange_select.png') no-repeat;
    background-size: 100% 100%;
  }

  input:checked + span {
    background-image: url('../../assets/images/coupon_exchange/icon_exchange_selected.png');
  }
}

.coupon_exchange_explain_item_num {
  width: pr(36);
  height: pr(36);
  border-radius: pr(18);
  background-color: #ebf2ff;
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(22);
  color: #206cfe;
  text-align: center;
}

.coupon_exchange_explain_item_content {
  font-family: PingFangSC-Regular;
  margin-left: pr(10);
  font-weight: 400;
  font-size: pr(28);
  color: #828ca0;
  flex: 1;
  line-height: pr(36);
}
</style>
