<template>
  <section class="advanced-success-container">
    <img class="icon-finished" src="../../../assets/images/redcoupon/icon-coupon-finished.png" alt="" />
    <div class="infor-wrapper">
      <h4>活动太火爆，优惠券已领完</h4>
      <p>奖励已领取完毕，请查看其他优惠活动</p>
    </div>
    <template v-if="!isHideUseBtn">
      <div class="btn-wrapper" v-if="!isPC">
        <div class="btn btn-use" @click="onMoreBenefits">{{ backupBtn }}</div>
      </div>
    </template>
  </section>
</template>

<script>
import { RED_COUPON_IMMEDIATE_USE } from '@data/statistic';
import { Track, browserVersions } from '@utils';

export default {
  name: 'CouponFinished',
  props: {
    activityInfo: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    isHideUseBtn() {
      const { isHideUseBtn = 0 } = this.activityInfo;
      return isHideUseBtn === '1' && this.CfwEnvService.isMiniProgram();
    },
    backupBtn() {
      const { backupBtn = '查看更多车主福利' } = this.activityInfo;
      return backupBtn;
    },
    isPC() {
      return !browserVersions().mobile;
    },
  },
  methods: {
    onMoreBenefits() {
      Track.pvClick.call(this, RED_COUPON_IMMEDIATE_USE);
      this.$emit('coupon-use', 'finished');
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../../assets/style/core/base.scss';
.advanced-success-container {
  margin-bottom: pr(32);
  background-color: #fff;
  border-radius: pr(12);
  padding: pr(60) pr(32) pr(40);
  box-sizing: border-box;

  .icon-finished {
    margin: 0 auto pr(48);
    display: block;
    width: pr(320);
    height: pr(320);
  }
  .infor-wrapper {
    h4 {
      margin-bottom: pr(34);
      font-size: pr(34);
      color: #111e36;
      text-align: center;
      line-height: pr(38);
      font-weight: 500;
    }
    p {
      font-size: pr(26);
      color: #666d7f;
      line-height: pr(30);
      text-align: center;
      font-weight: 300;
    }
  }
  .btn-wrapper {
    margin-top: pr(48);
    .btn {
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
