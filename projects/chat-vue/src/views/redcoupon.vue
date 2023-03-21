<template>
  <section
    class="coupon-activity-container"
    :style="{ backgroundColor: activityInfo.mainColor || '#fff' }"
  >
    <!-- <div class="share-icon" @click="onShare"></div> -->
    <!-- <div
      class="rule-icon"
      v-if="ruleList.length > 0"
      @click="onShowRules"
    >规则</div> -->
    <!-- 分享 -->
    <Share ref="share" v-if="activityInfo.isShare === '1'" :shareConfig="shareConfig"></Share>

    <!--  头部内容  -->
    <Header :bannersList="activityInfo.bannersList"></Header>
    <!--  /end  -->

    <div class="main-wrapper">
      <!--  表单  -->
      <component
        :is="displayComponent"
        :couponNumber="couponNumber"
        :userInfo="userInfo"
        :activityInfo="activityInfo"
        @coupon-use="openApp"
        @go-login="goLogin"
        @take-coupon="takeCoupon"
        @rights-take-coupon="rightsTakeCoupon"
      ></component>
      <!--  /end  -->

      <!-- 活动说明 -->
      <Introduction :activityInfo="activityInfo"></Introduction>
      <!--  /end  -->

      <!--  活动规则  -->
      <Rules v-if="ruleList.length > 0" :ruleList="ruleList" />
      <!--  /end  -->
    </div>

    <!--  底部logo  -->
    <Footer></Footer>
    <!--  /end  -->
  </section>
</template>

<script>
/*
 * 活动状态
 * 1、可以正常领取(车服务券) Form
 * 2、可以正常领取(权益中台券) NoForm
 * 3、活动已结束 ActivityFinished
 * 4、券已领取完 CouponFinished
 * 5、已经领取过优惠券 CouponTaked
 * 6、领取成功 Success
 * */
import { getActivityInfo, recordUserTakeCoupon, getActivityStatus, rightsTakeCoupon } from '@apis/redcoupon.api';
import { getUserInfo, getMiniProgramUserSign } from '@apis/common.api';
import Share from '@components/Business/Share.vue';
import Rules from '@components/Business/RedCoupon/RulesSection.vue';
import Header from '@components/Business/RedCoupon/Header.vue';
import Introduction from '@components/Business/RedCoupon/Introduction.vue';
import Footer from '@components/Business/RedCoupon/Footer.vue';
import Loading from '@components/Business/RedCoupon/Loading.vue'
// import AutoCallApp from '@auto/autocallapp';
import { myCouponUrl } from '@data';
import { Track } from '@utils';
import { loadScript } from '@utils/loadSource';
import { isJSON, channelString } from '@utils/stringHelper';
// import Form from '@components/Business/RedCoupon/Form.vue';
// import NoForm from '@components/Business/RedCoupon/NoForm.vue';
const Form = () => import('@components/Business/RedCoupon/Form.vue');
const NoForm = () => import('@components/Business/RedCoupon/NoForm.vue');
const Success = () => import('@components/Business/RedCoupon/Success.vue');
const CouponTaked = () => import('@components/Business/RedCoupon/CouponTaked.vue');
const ActivityFinished = () => import('@components/Business/RedCoupon/ActivityFinished.vue');
const CouponFinished = () => import('@components/Business/RedCoupon/CouponFinished.vue');

export default {
  name: 'advanced',
  components: {
    Share,
    Header,
    Loading,
    Form,
    NoForm,
    Success,
    CouponTaked,
    ActivityFinished,
    CouponFinished,
    Introduction,
    Footer,
    Rules,
  },
  data() {
    return {
      shareConfig: {
        pageName: '汽车之家车主福利',
      },
      activityInfo: {},
      displayComponent: 'Loading',
      isShowRules: false,
      recordUserTakeCoupon: [],
      isAutoApp: this.CfwEnvService.isAutoApp(),
      userInfo: {
        isLogin: false,
        userMobile: ''
      }
    };
  },
  computed: {
    ruleList() {
      const { activityRule = '' } = this.activityInfo;
      return activityRule.split('\n');
    },
    couponNumber() {
      return this.recordUserTakeCoupon.length;
    },
  },
  async created() {
    // 小程序
    // if (this.CfwEnvService.isMiniProgram()) {
    //   try {
    //     const { returncode = '', result = {} } = await getMiniProgramUserSign();
    //     const { uin = '' } = result;
    //     if (returncode === 0 && uin) { // 已登录
    //       this.userInfo.isLogin = true;
    //     }
    //     await this.getActivityInfo();
    //   } catch(e) {
    //     console.log('getMiniProgramUserSign报错：', e);
    //   }
    // } else { // 非小程序
    //   await this.getUserInfo();
    //   await this.getActivityInfo();
    // }
    await this.getActivityInfo();
    // 页面pv
    const {
      home_site_id: siteId,
      home_category_id: categoryId,
      home_sub_category_id: subCategoryId,
      activityName,
      isShare = '0',
    } = this.activityInfo || {};
    if (siteId && categoryId && subCategoryId) {
      Track.pvPage.call(this, { siteId, categoryId, subCategoryId });
    }
    // 设置标题和分享
    if (activityName && (!this.isAutoApp || (this.isAutoApp && isShare === '0'))) {
      this.CfwEnvService.setTitle(activityName);
    }
  },
  methods: {
    openApp(type) {
      // success 和 finished
      const { appUseScheme = '', backupUrl = '', downloadAutohomeLink = '', isOpenAutoFromM = '1' } = this.activityInfo;
      let URLScheme = myCouponUrl;
      if (type === 'success' && appUseScheme && /^autohome:\/\//.test(appUseScheme)) {
        URLScheme = appUseScheme;
      }
      if (type === 'finished' && backupUrl && /^autohome:\/\//.test(backupUrl)) {
        URLScheme = backupUrl;
      }
      if (this.isAutoApp) {
        window.location.href = URLScheme;
        return;
      }
      if (this.CfwEnvService.isAliMinProgram()) { // 支付宝小程序
        if (URLScheme.test(/^https?/)) {
          window.location.href = URLScheme;
          return;
        }
        window.my.navigateTo({ url: URLScheme });
        return;
      }

      if (isOpenAutoFromM === '1') {
        loadScript('https://activity.app.autohome.com.cn/static/autocallapp/main-v2.0.0.js').then(() => {
          // eslint-disable-next-line
          let call = new AutoCallApp({
            AdrDown: downloadAutohomeLink,
            IosDown: downloadAutohomeLink,
            YybPackage: 'com.cubic.autohome',
            URLScheme,
          });
          call.launch();
        });
      } else {
        window.location.href = downloadAutohomeLink;
      }
    },
    goLogin() {
      const { couponFrom } = this.activityInfo;
      // couponFrom: 1=> 权益中台券，else=> 车服务券
      if (!this.userInfo.isLogin && (this.isAutoApp || couponFrom === '1')) {
        // 支付宝APP
        if (this.CfwEnvService.isAliMinProgram()) {
          window.my.navigateTo({ url: '/pages/login/authorize?type=H5' });
          window.my.onMessage = async (e) => { // 登录回调
            const {loginState = '', session = ''} = e || {};
            if (loginState === 'login' && session) {
              this.userInfo.isLogin = true;
              await getMiniProgramUserSign();

              // 车服务券获取手机号
              if (couponFrom !== '1') {
                await this.getUserInfo();
              }
            }
          }
          return;
        }
        // 端内未登录，调用登录
        this.CfwEnvService.goLogin({
          success: (res) => {
            console.log('登录成功回调', res);
            const {returncode = '', result = {}} = res;
            if (returncode === 0 && result.pcpopclub) {
              this.userInfo.isLogin = true;
              // this.getUserInfo();
            }
          },
          fail: (err) => {
            console.log('登录失败回调', err);
          },
        });
      }
    },
    // onShare() {
    //   this.$refs.share.onShare();
    // },
    setShare() {
      if (this.activityInfo.isShare === '1') {
        const { shareTitle, shareDesc, shareImgUrl, shareUrl, activityName, bannersList } = this.activityInfo;
        this.shareConfig = {
          pageName: activityName || '汽车之家车主福利',
          title: shareTitle,
          content: shareDesc,
        };
        if (shareUrl) {
          this.shareConfig.url = shareUrl;
        }
        const imgArr = shareImgUrl ? JSON.parse(shareImgUrl) : '';
        if (Array.isArray(imgArr) && imgArr.length > 0) {
          const [imgUrl] = imgArr;
          this.shareConfig.imgurl = imgUrl.replace(/^https?/, 'https');
        }
        if (isJSON(bannersList)) {
          const banners = JSON.parse(bannersList);
          this.shareConfig.bgImgUrl = banners[0] || '';
        }

        this.$nextTick(() => {
          this.$refs.share.setShare();
        });
      }
    },
    onShowRules() {
      this.isShowRules = true;
    },
    // 权益中台券立即领取
    async rightsTakeCoupon() {
      try {
        const { couponBatchNo = '' } = this.activityInfo;
        const { returncode, message, result } = await rightsTakeCoupon({
          activityKey: couponBatchNo,
          reqSource: Number(this.pvareaid) || 0,
          couponChannel: channelString(),
        });

        if (returncode === 0) {
          this.recordUserTakeCoupon = result;
          this.displayComponent = 'Success';
        } else if ([-45].includes(returncode)) {
          this.displayComponent = 'CouponTaked';
        } else if ([-43].includes(returncode)) {
          this.displayComponent = 'ActivityFinished';
        } else if ([-5, -7, -38, -42, -33].includes(returncode)) {
          this.displayComponent = 'CouponFinished';
        } else {
          this.$toast(message || '领取失败，请稍后重试');
        }
      } catch(e) {
        console.log('权益中心领券失败', e);
      }
    },
    // 车服务券立即领取
    async takeCoupon({ mobile = '', mobileCode = '' }) {
      try {
        const { couponBatchNo = '' } = this.activityInfo;
        const { returncode, message, result } = await recordUserTakeCoupon({
          mobile,
          mobile_code: mobileCode,
          activity_key: couponBatchNo,
          reqSource: Number(this.pvareaid) || 0,
          couponChannel: channelString(),
        });
        if (returncode === 0) {
          this.recordUserTakeCoupon = result.couponList;
          this.displayComponent = 'Success';
        } else if ([-17, -45].includes(returncode)) {
          // -17：已领取；-45：超过限制领取的数量
          this.recordUserTakeCoupon = result.couponList;
          this.displayComponent = 'CouponTaked';
        } else if ([-5, -46].includes(returncode)) {
          // -5：券已领完；-46：当前用户不可领取
          this.displayComponent = 'CouponFinished';
        } else if (returncode === -43) {
          this.displayComponent = 'ActivityFinished';
        } else if (returncode === -27) {
          this.$toast('手机验证码不正确');
        } else {
          this.$toast(message || '领取失败，请稍后重试');
        }
      } catch (e) {
        console.log('领取优惠券失败', e);
      }
      return true;
    },
    async getUserInfo() {
      try {
        const { returncode, result } = await getUserInfo();
        if (returncode === 0 && result && result.login) { // 已登录
          if (!this.CfwEnvService.isMiniProgram()) {
            this.userInfo.isLogin = true;
          }
          this.userInfo.userMobile = result.userPhone
          return;
        }
        throw Error('未登录');
      } catch (e) {
        console.log('获取用户信息失败', e);
      }
    },
    async loginInit() {
      if (this.CfwEnvService.isMiniProgram()) {
        try {
          const { returncode = '', result = {} } = await getMiniProgramUserSign();
          const { uin = '' } = result;
          if (returncode === 0 && uin) { // 已登录
            this.userInfo.isLogin = true;
            await this.getUserInfo();
          }
        } catch(e) {
          console.log('getMiniProgramUserSign报错：', e);
        }
      } else {
        await this.getUserInfo();
      }
    },
    // 获取活动配置信息
    async getActivityInfo() {
      try {
        // 测试：'fd27799f-dc96-11ec-bcda-fa163e6915a3', 线上：'f1a20101-b250-11ec-965a-246e96529166'
        const { code = '' } = this.$route.query;
        if (!code) {
          this.$toast('活动code不存在');
          return false;
        }
        const { returncode, message, result } = await getActivityInfo({
          code,
        });
        if (returncode === 0 && result) {
          const { activitySetting = null, activity: { status } = { status: 1 } } = result;
          // status：0：下线；1：正常；2：活动未开始；3：活动已经结束
          if (activitySetting) {
            this.activityInfo = activitySetting;
            this.setShare();
            if (status === 0) {
              // 只判断下线，2和3的活动时间不是真实数据
              this.displayComponent = 'ActivityFinished';
            } else {
              // 获取用户登录信息
              await this.loginInit();
              const { couponFrom } = this.activityInfo;
              if (couponFrom === '1') { // 权益中台券
                this.displayComponent = 'NoForm';
              } else {
                // // 车服务券&&已登录用户 获取用户手机号
                // if (this.CfwEnvService.isMiniProgram() && this.userInfo.isLogin) {
                //   await this.getUserInfo();
                // }
                await this.getActivityStatus();
              }
            }
          } else {
            throw new Error(message);
          }
        } else {
          throw new Error(message);
        }
      } catch (e) {
        this.displayComponent = 'ActivityFinished';
        console.log('获取活动配置信息失败', e);
      }
      return true;
    },
    async getActivityStatus() {
      try {
        const { couponBatchNo } = this.activityInfo;
        if (!couponBatchNo) {
          this.$toast('优惠券批次不存在');
          return false;
        }
        const { returncode } = await getActivityStatus({
          activity_key: couponBatchNo,
        });
        if (returncode === 0) {
          this.displayComponent = 'Form';
          // TODO 暂时不校验登录
          // this.goLogin();
        } else if (returncode === -43 || returncode === -12) {
          this.displayComponent = 'ActivityFinished';
        } else if (returncode === -5) {
          this.displayComponent = 'CouponFinished';
        } else {
          this.displayComponent = 'ActivityFinished';
        }
      } catch (e) {
        this.displayComponent = 'ActivityFinished';
        console.log('获取活动状态报错', e);
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
// @import '../assets/style/core/_base.scss';
.coupon-activity-container {
  position: relative;
  @media screen and (min-width: 480px) {
    max-width: 375px;
  }
  margin: 0 auto;

  .share-icon {
    position: fixed;
    top: pr(20);
    right: pr(20);
    z-index: 1000;
    width: pr(76);
    height: pr(76);
    background: rgba(0, 0, 0, 0.2) url('../assets/images/redcoupon/icon-share.png') center center no-repeat;
    background-size: pr(40) pr(40);
    // filter: blur(pr(20));
    border-radius: 50%;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 200%;
      height: 200%;
      transform-origin: 0 0;
      transform: scale(0.5, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
    }
  }
  .rule-icon {
    position: absolute;
    right: 0;
    top: pr(140);
    z-index: 1000;
    width: pr(44);
    height: pr(120);
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-lr;
    font-size: pr(26);
    color: #a01412;
    line-height: pr(32);
    font-weight: 500;
    font-family: PingFangSC-Medium;
    letter-spacing: pr(8);
    background: url('../assets/images/redcoupon/icon-rule-bg.png') center center no-repeat;
    background-size: 100% 100%;
  }
}
.main-wrapper {
  padding: 0 pr(24);
  box-sizing: border-box;
  .components-wrapper {
    min-height: pr(600);
    background: #fff;
    border-radius: pr(12);
  }
}
</style>
