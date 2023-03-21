<template>
  <section class="advanced-success-container">
    <h3 class="title">领取车主福利</h3>
    <p class="infor">恭喜您获得 <span>{{couponNumber}} 张</span>优惠券</p>
    <p class="tips">奖励已到账，请前往<span>{{usePath}}</span>中查看</p>
    <template v-if="!isHideUseBtn">
      <DisplayPC v-if="isPC" :originUrl="downloadAutohomeLink"></DisplayPC>
      <div v-else class="btn-wrapper" >
        <div class="btn btn-use" @click="onCouponUse">{{useBtnName}}</div>
      </div>
    </template>
  </section>
</template>

<script>
import { RED_COUPON_IMMEDIATE_USE } from '@data/statistic';
import { Track, browserVersions } from '@utils';
import DisplayPC from './DisplayPC.vue';

export default {
  name: 'Success',
  components: { DisplayPC },
  props: {
    couponNumber: {
      type: Number,
      default: 0,
      required: true,
    },
    activityInfo: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    usePath() {
      const { pathText = '汽车之家-我的-卡券' } = this.activityInfo;
      return pathText;
    },
    isHideUseBtn() {
      const { isHideUseBtn = 0 } = this.activityInfo;
      return isHideUseBtn && this.CfwEnvService.isMiniProgram();
    },
    useBtnName() {
      const { useBtnName = '立即使用' } = this.activityInfo;
      return useBtnName;
    },
    downloadAutohomeLink() {
      const { downloadAutohomeLink = '' } = this.activityInfo;
      return downloadAutohomeLink;
    },
    isPC() {
      return !browserVersions().mobile;
    },
  },
  methods: {
    onCouponUse() {
      Track.pvClick.call(this, RED_COUPON_IMMEDIATE_USE);
      this.$emit('coupon-use', 'success');
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../../assets/style/core/base.scss';
$imgPath: '~@assets/images/redcoupon/';
.advanced-success-container {
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

  .infor {
    margin-bottom: pr(36);
    line-height: pr(88);
    background-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 0, 0, 0.07) 49%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: pr(8);
    font-size: pr(32);
    color: #111e36;
    font-weight: 500;
    text-align: center;
    position: relative;
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
      color: #ff4434;
    }
  }

  .show-img {
    margin-bottom: pr(40);
    display: block;
    width: 100%;
  }

  .tips {
    margin-top: 0;
    font-size: pr(24);
    color: #828ca0;
    text-align: center;
    line-height: pr(34);
    span {
      color: #ff4434;
    }
  }

  .btn-wrapper {
    margin-top: pr(60);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn {
      width: 100%;
      height: pr(88);
      border-radius: pr(48);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: pr(36);
      font-weight: 500;
      letter-spacing: pr(1);

      &.btn-use {
        background-color: #ee3d29;
        background-image: radial-gradient(at 130% 10%, #ffc35c 10%, rgba(255, 172, 107, 0) 80%),
          linear-gradient(90deg, #fe4242 0%, #ee3d29 100%);
        box-shadow: inset pr(2) pr(-6) pr(10) 0 rgba(255, 255, 255, 0.3);
        color: #fff;
      }
    }
  }
}
</style>
