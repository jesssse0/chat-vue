<template>
  <section class="container" :style="{ background: activitySetting.mainColor || '#0065ff' }">
    <img class="kv" :src="kvUrl" />
    <div class="rule" @click="openRule" v-if="activitySetting.activityRule">
      <span style="margin-bottom: 2px">规</span>
      <span>则</span>
    </div>
    <div class="content">
      <template v-if="activity.status !== 0 && activity.id">
        <SessionSection
          class="gutter"
          :title="activitySetting.grabCouponName || '每日必抢'"
          :activityId="activity.id"
          :distanceTime="distanceTime"
        ></SessionSection>
        <SwellSection
          :title="activitySetting.bulkCouponName || '膨胀领券'"
          :activityId="activity.id"
          :distanceTime="distanceTime"
        ></SwellSection>
      </template>
      <Error ref="errorView" :state="errorState" @callback="getInfo('refresh')" />
    </div>
    <UnLoginMask />
    <NotAutoAppMask :downloadUrl="activitySetting.downloadUrl || 'https://athm.cn/x/azkFH2c'" />
    <Footer />
    <Loading :loadingObj="loadingObj" />
    <RulePop :visible="visible" :text="activitySetting.activityRule || ''" @closeModal="closeModal" />
  </section>
</template>
<script>
import UnLoginMask from '@components/Base/UnLoginMask.vue';
import NotAutoAppMask from '@components/Base/NotAutoAppMask.vue';
import SessionSection from '@components/Business/ShareSwell/SessionSection.vue';
import SwellSection from '@components/Business/ShareSwell/SwellSection.vue';
import Loading from '@components/Base/Loading.vue';
import Error from '@components/Base/Error.vue';
import Footer from '@components/Base/Footer.vue';
import RulePop from '@components/Business/ShareSwell/RulePop.vue';
import navlucency from '@utils/navlucency.js';
import { getActivityInfo, getServerTime } from '@apis/common.api';
import { Track } from '@utils';
import { GRABCOUPON_SHARESWELL_HOME_APP_PV, GRABCOUPON_SHARESWELL_HOME_H5_PV } from '@data/statistic';
import KV from '@assets/images/shareswell/bg-default.png';

export default {
  name: 'ShareSwell',
  components: {
    UnLoginMask,
    NotAutoAppMask,
    SessionSection,
    SwellSection,
    Loading,
    Footer,
    Error,
    RulePop,
  },
  data() {
    return {
      code: this.$route.query.code || '',
      loadingObj: {
        loadingState: 0,
        dataHint: '活动加载中...',
      },
      activitySetting: {},
      activity: {},
      errorState: 0,
      distanceTime: 0, // 客户端时间 - 服务器时间
      kvUrl: KV,
      visible: false,
    };
  },
  async created() {
    this.setShare();
    this.getDistanceTime();
    await this.getInfo();
    // 页面pv
    const {
      home_site_id: siteId,
      home_category_id: categoryId,
      home_sub_category_id: subCategoryId,
    } = this.activitySetting || {};
    console.log(siteId, categoryId, subCategoryId);
    if (siteId && categoryId && subCategoryId) {
      Track.pvPage.call(this, { siteId, categoryId, subCategoryId });
    }
    if (this.CfwEnvService.isAutoApp()) {
      Track.pvClick.call(this, GRABCOUPON_SHARESWELL_HOME_APP_PV);
    } else {
      Track.pvClick.call(this, GRABCOUPON_SHARESWELL_HOME_H5_PV);
    }
  },
  methods: {
    getDistanceTime() {
      getServerTime().then(({ result }) => {
        this.distanceTime = new Date().getTime() - result;
      });
    },
    setShare() {
      console.log(this.activitySetting);
      let imgurl = 'https://x.autoimg.cn/cfw/yc/cus/products/src/images/chezhu-logo@3x.png';
      if (this.activitySetting.shareImgUrl && JSON.parse(this.activitySetting.shareImgUrl).length) {
        // eslint-disable-next-line prefer-destructuring
        imgurl = JSON.parse(this.activitySetting.shareImgUrl)[0];
        if (imgurl.match('^http://')) {
          imgurl = imgurl.replace(/^http:\/\//i, 'https://');
        }
      }
      const shareInfo = {
        pageName: this.activitySetting.activityName || '天天领福利',
        title: this.activitySetting.shareTitle || '天天领福利',
        content: this.activitySetting.shareDesc || '天天领福利',
        url: window.location.href,
        platform: 'weixin&weixincircle',
        imgurl,
        success() {
          console.log('分享成功了111');
        },
        fail() {
          console.log('分享失败了111');
        },
      };
      this.CfwEnvService.setShare(shareInfo);
      if (this.CfwEnvService.isAutoApp()) {
        // 主软
        navlucency();
      } else {
        this.CfwEnvService.setTitle(this.activitySetting.activityName || '天天领福利');
      }
    },
    async getInfo(type) {
      if (!this.code) {
        this.$toast('缺少活动code');
        return;
      }
      this.loadingObj.loadingState = 1;
      if (type === 'refresh') {
        this.$refs.errorView.setSuccess();
      }
      try {
        const res = await getActivityInfo({ code: this.code });
        if (res && res.returncode === 0) {
          this.loadingObj.loadingState = 0;
          const {
            result: { activitySetting, activity },
          } = res;

          this.activitySetting = activitySetting;
          this.activity = activity;
          if (activitySetting.bannersList && JSON.parse(activitySetting.bannersList).length) {
            // eslint-disable-next-line prefer-destructuring
            this.kvUrl = JSON.parse(activitySetting.bannersList)[0];
          }
          this.setShare();
          // status：0：下线；1：正常；2：活动未开始；3：活动已经结束
          if (activity.status === 0) {
            this.$refs.errorView.setCustomError('活动已下线', '', '');
          }
        } else {
          throw res;
        }
      } catch (e) {
        this.loadingObj.loadingState = 0;
        this.errorState = 3;
      }
    },
    // 打开规则弹窗
    openRule() {
      if (!this.activitySetting.activityRule) {
        return;
      }
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #0065ff;
  box-sizing: border-box;
  padding-bottom: pr(120);
  padding-top: 68.8%;
  position: relative;
  z-index: 0;
  .kv {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .rule {
    position: absolute;
    right: 0;
    top: pr(172);
    width: pr(44);
    height: pr(120);
    background: url('~@assets/images/shareswell/icon-rule.png') center center no-repeat;
    background-size: 100% 100%;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: pr(26);
    color: #4881ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 pr(24);
  }
}
.box {
  width: 80%;
  height: 50%;
  background: #fff;
}
.gutter {
  margin-bottom: pr(32);
}
</style>
