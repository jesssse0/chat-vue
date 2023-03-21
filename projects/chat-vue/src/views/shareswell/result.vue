<template>
  <div
    :style="{
      backgroundColor: backgroundColor,
      position: 'relative',
      minHeight: '100vh',
      'padding-bottom': 'pr(60)',
      'padding-top': '68.8%',
      'box-sizing': 'border-box',
      'z-index': 0,
    }"
  >
    <!--    <UnLoginMask />-->
    <img class="success-header" :src="headImageUrl" />
    <div class="success-container" v-if="swellState === 1">
      <div class="success-title">
        <img src="@assets/images/shareswell/icon-success-star-left.png" class="success-title-left-star" />
        谢谢你帮我助力
        <img src="@assets/images/shareswell/icon-success-star-right.png" class="success-title-right-star" />
      </div>
      <div class="success-subtitle">也送您一张<span>车主权益优惠券</span></div>
      <div class="success-coupon-container">
        <SuccessCoupon :coupon="successCoupon" />
      </div>
      <div class="success-see" @click="gotoViewMyCoupon">奖励已到账，请前往<span>汽车之家-我的-卡券</span>查看</div>
      <div class="success-button">
        <div class="success-use-btn" @click="gotoUseCoupon('success')">立即使用</div>
        <div class="success-get-btn" @click="gotoSwellHomeIndex('success')">获取同款福利</div>
      </div>
    </div>
    <div class="fail-container" v-else-if="swellState === 2">
      <img src="@assets/images/redcoupon/icon-coupon-finished.png" class="fail-icon" />
      <div class="fail-title">助力失败</div>
      <div class="fail-subtitle">您的助力失败，请尝试其他优惠</div>
      <div class="fail-see-btn" @click="gotoSwellHomeIndex('fail')">查看其他福利</div>
    </div>
    <div class="error-container" v-else-if="swellState === 3">
      <Error :state="errorState" @callback="errorRefresh" />
    </div>
    <!--    <div class="footer-wrapper">-->
    <!--      <img src="@assets/images/redcoupon/auto-logo.png" alt="">-->
    <!--    </div>-->
    <SuccessHelpPop
      :visible="successPopVisible"
      :coupon="successCoupon"
      @closeModal="closeSwellSuccessPop"
      @getSameWelfare="gotoSwellHomeIndex"
      @gotoUseCoupon="gotoUseCoupon"
    />
    <Loading :loading-obj="loadingObj" />
    <template v-if="false">
      <NotAutoAppMask :downloadUrl="downloadUrl" />
    </template>
  </div>
</template>
<script>
import NotAutoAppMask from '@components/Base/NotAutoAppMask.vue';
import SuccessCoupon from '@components/Business/ShareSwell/SuccessCoupon.vue';
import SuccessHelpPop from '@components/Business/ShareSwell/SuccessHelpPop.vue';
import ResultHeaderIcon from '@assets/images/shareswell/bg-default.png';
import { getUserInfo } from '../../apis/common.api';
import Loading from '../../components/Base/Loading.vue';
import { getActivityInfo } from '../../apis/redcoupon.api';
import Error from '../../components/Base/Error.vue';
import navlucency from '../../utils/navlucency';
import { takeCoupon } from '../../apis/coupons.api';
import { YCZJ_HOST } from '../../apis/host.config';
import { popAndPushNext, Track } from '../../utils';
import { myCouponUrl } from '../../data';
import {
  SHARESWELL_RESULT_PV,
  SHARESWELL_RESULT_TOUSE_CLICK,
  SHARESWELL_RESULT_HELPSUCCESS_POP_TOUSE_CLICK,
  SHARESWELL_RESULT_MORE_CLICK,
  SHARESWELL_RESULT_HELPSUCCESS_POP_MORE_CLICK,
  SHARESWELL_RESULT_FAIL_MORE_CLICK,
  SHARESWELL_RESULT_HELPSUCCESS_POP_SHOW,
  SHARESWELL_RESULT_MYCOUPON_CLICK,
} from '../../data/statistic';

export default {
  name: 'result',
  components: {
    NotAutoAppMask,
    SuccessCoupon,
    SuccessHelpPop,
    Loading,
    Error,
  },
  data() {
    return {
      count: 0,
      downloadUrl: '',
      successPopVisible: false,
      backgroundColor: '#0065FF',
      headImageUrl: ResultHeaderIcon,
      swellState: 0, // 0未开始请求，1请求成功&助力成功 2请求成功&助力失败 3请求失败
      isLogin: false,
      userInfo: undefined,
      loadingObj: {
        loadingState: 0,
        dataHint: '',
      },
      deviceId: '',
      errorState: 3,
      successCoupon: {},
      isClicked: false,
    };
  },
  created() {
    this.init();
    this.getHeaderConfig();
    this.getLoginState();
  },
  methods: {
    init() {
      Track.pvClick.call(this, SHARESWELL_RESULT_PV);
      if (this.CfwEnvService.isAutoApp()) {
        // 主软
        navlucency();
      }
    },
    getHeaderConfig() {
      const { code = '' } = this.$route.query;
      getActivityInfo({
        code,
      })
        .then((res) => {
          if (res && res.returncode === 0 && res.result) {
            const activitySet = res.result.activitySetting;
            if (
              activitySet &&
              activitySet.helpSuccessImg &&
              activitySet.helpSuccessImg.length > 0 &&
              activitySet.helpSuccessMainColor
            ) {
              this.backgroundColor = activitySet.helpSuccessMainColor;
              const headericonList = JSON.parse(activitySet.helpSuccessImg);
              const headericon = headericonList[0];
              this.headImageUrl = headericon;
            }
            const {
              home_site_id: siteId,
              home_category_id: categoryId,
              home_sub_category_id: subCategoryId,
            } = activitySet || {};
            if (siteId && categoryId && subCategoryId) {
              Track.pvPage.call(this, { siteId, categoryId, subCategoryId });
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    swellRequest() {
      const { couponRecordId = '', couponSettingId = '' } = this.$route.query;
      takeCoupon({
        deviceId: this.deviceId,
        couponRecordId,
        couponSettingId,
        actionType: 2,
        mobile: this.userInfo.userPhone,
      })
        .then((res) => {
          this.loadingObj.loadingState = 0;
          if (res && res.result && res.returncode === 0 && res.result.length > 0) {
            const couponInfo = res.result[0];
            console.log(couponInfo);
            this.successCoupon = couponInfo;
            this.swellState = 1;
            this.successPopVisible = true;
            Track.pvClick.call(this, SHARESWELL_RESULT_HELPSUCCESS_POP_SHOW);
          } else {
            console.log('助力失败');
            this.swellState = 2;
            const errorMsg =
              res && res.message && res.message.length > 0 ? res.message : '您的助力失败，请尝试其他优惠';
            this.$toast(errorMsg);
          }
        })
        .catch((e) => {
          this.loadingObj.loadingState = 0;
          this.swellState = 3;
        });
    },
    // 获取deviceid
    async getDeviceInfo() {
      this.loadingObj.loadingState = 1;
      this.loadingObj.dataHint = '助力中...';
      const deviceInfo = await this.CfwEnvService.getDeviceInfo();
      const { deviceid } = deviceInfo;
      console.log(deviceid);
      this.deviceId = deviceid;
      this.swellRequest();
    },
    // 判断登录状态
    getLoginState() {
      getUserInfo()
        .then((res) => {
          if (res && res.returncode === 0 && res.result) {
            const userInfo = res.result;
            this.userInfo = userInfo;
            this.isLogin = userInfo.userId !== 0 && userInfo.userPhone && userInfo.userPhone.length === 11;
            this.getDeviceInfo();
          } else {
            this.isLogin = false;
            this.toLogin();
          }
        })
        .catch((e) => {
          this.isLogin = false;
          this.toLogin();
        });
    },
    // 去登录
    toLogin() {
      this.CfwEnvService.goLogin({
        success() {
          window.location.reload();
        },
        fail() {
          window.location.reload();
        },
      });
    },
    // 关闭助力成功弹窗
    closeSwellSuccessPop() {
      this.successPopVisible = false;
    },
    // 查看福利首页
    gotoSwellHomeIndex(type) {
      console.log(type);
      if (type === 'success') {
        Track.pvClick.call(this, SHARESWELL_RESULT_MORE_CLICK);
      } else if (type === 'fail') {
        Track.pvClick.call(this, SHARESWELL_RESULT_FAIL_MORE_CLICK);
      } else if (type === 'pop') {
        Track.pvClick.call(this, SHARESWELL_RESULT_HELPSUCCESS_POP_MORE_CLICK);
      }
      const { code = '' } = this.$route.query;
      const url = `${YCZJ_HOST}/topic/operation-activity/shareswell?code=${code}`;
      const scheme = `autohome://insidebrowserwk?url=${encodeURIComponent(url)}`;
      popAndPushNext(scheme);
    },
    // 查看我的卡券
    gotoViewMyCoupon() {
      Track.pvClick.call(this, SHARESWELL_RESULT_MYCOUPON_CLICK);
      window.location.href = myCouponUrl;
    },
    // 去使用
    gotoUseCoupon(type) {
      if (type === 'success') {
        console.log(type);
        Track.pvClick.call(this, SHARESWELL_RESULT_TOUSE_CLICK);
      } else if (type === 'pop') {
        console.log(type);
        Track.pvClick.call(this, SHARESWELL_RESULT_HELPSUCCESS_POP_TOUSE_CLICK);
      }
      const { useUrl } = this.successCoupon;
      if (!useUrl) {
        this.$toast('福利走丢了，请稍后重试');
        return false;
      }
      if (/^autohome/.test(useUrl)) {
        window.location.href = useUrl;
      } else {
        this.CfwEnvService.open({ name: useUrl });
      }
      return true;
    },
    // 报错刷新
    errorRefresh() {
      if (this.isClicked) {
        return;
      }
      this.isClicked = true;
      setTimeout(() => {
        this.isClicked = false;
      }, 1000);
      this.loadingObj.loadingState = 1;
      this.loadingObj.dataHint = '助力中...';
      this.swellRequest();
    },
  },
};
</script>
<style lang="scss">
.success-header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.success-container {
  margin-left: pr(24);
  margin-right: pr(24);
  //height: pr(600);
  background-color: #ffffff;
  border-radius: pr(12);
  flex-direction: column;
  padding-top: pr(40);
  padding-bottom: pr(40);
  box-sizing: border-box;
  position: relative;
  //margin-top: pr(-40);
}
.success-title-container {
  display: flex;
  flex-direction: row;
}
.success-title {
  color: #111e36;
  font-size: pr(36);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
}
.success-title-left-star {
  width: pr(84);
  height: pr(28);
}
.success-title-right-star {
  width: pr(84);
  height: pr(28);
}
.success-subtitle {
  margin-top: pr(32);
  margin-left: pr(26);
  margin-right: pr(26);
  height: pr(80);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 0, 0, 0.07) 49%,
    rgba(255, 255, 255, 0) 100%
  );
  position: relative;
  color: #828ca0;
  font-size: pr(28);
  font-family: PingFangSC-Regular;
  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      270deg,
      rgba(255, 148, 148, 0) 0%,
      rgba(255, 148, 148, 0) 5%,
      rgba(251, 112, 112, 0.62) 49%,
      rgba(255, 126, 0, 0) 95%,
      rgba(255, 148, 148, 0) 100%
    );
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
  span {
    font-weight: 500;
    color: #f10265;
    font-family: PingFangSC-Medium;
  }
}
.success-coupon-container {
  margin-top: pr(40);
  margin-left: pr(76);
  margin-right: pr(76);
  height: pr(144);
}
.success-see {
  margin-top: pr(50);
  color: #828ca0;
  font-size: pr(24);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  span {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #464e64;
  }
}
.success-button {
  margin-top: pr(44);
  height: pr(88);
  margin-left: pr(48);
  margin-right: pr(48);
  display: flex;
  justify-content: space-between;
}
.success-use-btn {
  width: pr(286);
  height: pr(88);
  background-color: rgba(241, 2, 101, 0.07);
  border-radius: pr(12);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(32);
  color: #f10265;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.success-get-btn {
  width: pr(286);
  height: pr(88);
  background-image: linear-gradient(90deg, #ff1e6f 0%, #ff0239 100%);
  border-radius: pr(12);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(32);
  color: #ffffff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-wrapper {
  position: absolute;
  bottom: pr(100);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
    width: pr(134);
    height: pr(52);
  }
}
.fail-container {
  margin-left: pr(24);
  margin-right: pr(24);
  border-radius: pr(12);
  box-sizing: border-box;
  padding-top: pr(40);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: pr(48);
  padding-right: pr(48);
  padding-bottom: pr(44);
  z-index: 0;
  position: relative;
  //margin-top: pr(-40);
}
.fail-icon {
  display: block;
  width: pr(280);
  height: pr(280);
}
.fail-title {
  margin-top: pr(36);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(34);
  color: #111e36;
}
.fail-subtitle {
  margin-top: pr(24);
  font-family: PingFangSC-Light;
  font-weight: 300;
  font-size: pr(26);
  color: #666d7f;
}
.fail-see-btn {
  margin-top: pr(48);
  //margin-left: pr(48);
  //margin-right: pr(48);
  height: pr(88);
  background-image: linear-gradient(90deg, #ff1e6f 0%, #ff0239 100%);
  border-radius: pr(12);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(32);
  color: #ffffff;
  //display: flex;
  width: 100%;
  line-height: pr(88);
  text-align: center;
}
.error-container {
  margin-left: pr(24);
  margin-right: pr(24);
  border-radius: pr(12);
  box-sizing: border-box;
  padding-top: pr(40);
  background-color: #ffffff;
  z-index: 0;
  position: relative;
  //margin-top: pr(-40);
}
</style>
