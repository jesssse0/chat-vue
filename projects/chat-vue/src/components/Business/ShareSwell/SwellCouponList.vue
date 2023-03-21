<template>
  <div>
    <!--  优惠券列表  -->
    <ul class="swell-coupon-list">
      <li class="coupon-item" v-for="coupon in list" :key="coupon.settingId">
        <div class="left">
          <div class="price">
            {{ [3, 101].includes(coupon.status) ? coupon.bulkCouponParValue : coupon.couponParValue
            }}<span>{{ coupon.couponUnit }}</span>
          </div>
          <div class="btn-coupon-use" v-if="[1, 2, 4].includes(coupon.status)" @click="useCoupon(coupon)">直接使用</div>
        </div>
        <div class="center">
          <h3 class="title">{{ coupon.couponMainTitle }}</h3>
          <div class="desc flex" v-if="coupon.status === 2">
            <Counter :count="coupon.count || 0" color="#F10265" @finishCallBack="update(coupon)" />
            <div class="count-down-text">后失效</div>
          </div>
          <div class="desc flex" v-else-if="coupon.status === 3">
            <img src="@assets/images/shareswell/icon-swell-success.png" alt="" />好友已助力成功
          </div>
          <div class="desc flex" v-else-if="coupon.status === 4">
            <img src="@assets/images/shareswell/icon-swell-fail.png" alt="" />好友助力失败
          </div>
          <div class="desc" v-else>{{ coupon.ruleText || '' }}</div>
        </div>
        <div class="right">
          <p class="status-text">
            {{ [3, 101].includes(coupon.status) ? '已' : '' }}膨胀至<span
              >{{ coupon.bulkCouponParValue }}{{ coupon.couponUnit }}</span
            >
          </p>
          <div
            class="btn-coupon"
            :class="{
              disabled: [99, 100, 101].includes(coupon.status),
              swell: [1, 2, 4].includes(coupon.status),
            }"
            @click="couponAction(coupon)"
          >
            {{ couponButtonObj[coupon.status] }}
          </div>
        </div>
      </li>
    </ul>
    <!--  抢神券成功弹窗  -->
    <SwellSharePop
      :visible="swellShareVisible"
      :coupon="currentCoupon"
      @closeModal="swellShareVisible = false"
      @shareSwell="createKouLing"
    />
    <!--  分享复制弹窗  -->
    <ShareCopyPop :show="shareCopyVisible" :kouLing="kouLing" @onClose="shareCopyVisible = false" />
  </div>
</template>

<script>
import Counter from '@components/Base/Counter.vue';
import SwellSharePop from '@components/Business/ShareSwell/SwellSharePop.vue';
import ShareCopyPop from '@components/Business/ShareSwell/ShareCopyPop.vue';
import { takeCoupon, createKouLing } from '@apis/shareswell.api.js';
import { Track } from '@utils';
import {
  SHARESWELL_GET_CLICK,
  SHARESWELL_TOSHARE_CLICK,
  SHARESWELL_AGAINSHARE_CLICK,
  SHARESWELL_SWELLBEFORE_TOUSE_CLICK,
  SHARESWELL_SWELLAFTER_TOUSE_CLICK,
} from '@data/statistic.js';

export default {
  name: 'SwellCouponList',
  components: {
    Counter,
    SwellSharePop,
    ShareCopyPop,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swellShareVisible: false,
      shareCopyVisible: false,
      kouLing: '',
      deviceId: '',
      currentCoupon: {},
      throttle: true,
    };
  },
  computed: {
    couponButtonObj() {
      return {
        0: '抢神券', // 未领取
        1: '免费膨胀', // 领取后待分享
        2: '邀请好友', // 领取后已分享
        3: '去使用', // 已分享助力成功
        4: '重新分享', // 已分享助力失败
        99: '已抢光', // 券抢光
        100: '已使用', // 膨胀前已使用
        101: '已使用', // 膨胀后已使用
      };
    },
    btnText() {
      return (type) => this.couponButtonObj[type];
    },
  },
  created() {
    if (this.CfwEnvService.isAutoApp()) {
      this.CfwEnvService.getDeviceInfo().then(({ deviceid: deviceId }) => {
        this.deviceId = deviceId;
      });
    }
  },
  methods: {
    async couponAction(coupon) {
      // 防抖
      if (!this.throttle) {
        return false;
      }
      this.throttle = false;
      setTimeout(() => {
        this.throttle = true;
      }, 1000);

      this.currentCoupon = coupon;
      const { couponTypeName: couponType, couponParValue, couponUnit } = coupon;
      switch (coupon.status) {
        case 0:
          Track.pvClick.call(this, SHARESWELL_GET_CLICK, {
            couponType,
            couponMoney: `${couponParValue}${couponUnit}`,
          });
          await this.getBasicCoupon();
          break;
        case 1:
        case 2:
          Track.pvClick.call(this, SHARESWELL_TOSHARE_CLICK, {
            couponType,
            couponMoney: `${couponParValue}${couponUnit}`,
          });
          await this.createKouLing();
          break;
        case 4:
          Track.pvClick.call(this, SHARESWELL_AGAINSHARE_CLICK);
          await this.createKouLing();
          break;
        case 3:
          this.useCoupon(coupon);
          break;
        default:
          break;
      }
      return true;
    },
    // 抢神券
    async getBasicCoupon() {
      const { recordId, settingId } = this.currentCoupon;
      const params = {
        actionType: 2,
        couponRecordId: recordId || 0,
        deviceId: this.deviceId,
        couponSettingId: settingId,
      };
      try {
        const res = await takeCoupon(params);
        const { returncode, message, result } = res;
        if (returncode === 0 && result) {
          // 领取成功
          this.update();
          this.swellShareVisible = true;
        } else {
          throw Error(message);
        }
      } catch (e) {
        this.$toast(e.message || '抢神券失败');
      }
    },
    // 生成口令
    async createKouLing() {
      const { recordId, settingId } = this.currentCoupon;
      const { code } = this.$route.query;
      const params = {
        code,
        actionType: 2,
        couponRecordId: recordId || 0,
        deviceId: this.deviceId,
        couponSettingId: settingId,
      };
      try {
        const { result, message } = await createKouLing(params);
        if (result) {
          this.kouLing = result;
          this.shareCopyVisible = true;
          this.update();
        } else {
          throw Error(message);
        }
      } catch (e) {
        this.$toast(e.message || '获取口令失败');
      }
    },
    // 去使用
    useCoupon({ couponUseUrl, status }) {
      if (status === 3) {
        Track.pvClick.call(this, SHARESWELL_SWELLAFTER_TOUSE_CLICK);
      } else {
        Track.pvClick.call(this, SHARESWELL_SWELLBEFORE_TOUSE_CLICK);
      }
      if (!couponUseUrl) {
        this.$toast('福利走丢了，请稍后重试');
        return false;
      }

      console.log(/^autohome/.test(couponUseUrl));
      // this.CfwEnvService.open(
      //   'autohome://rninsidebrowser?url=rn%3A%2F%2FCarService_OilCard%2FGasStation%3Fsource%3D111091135.H5.6856992'
      // );

      if (/^autohome/.test(couponUseUrl)) {
        window.location.href = couponUseUrl;
      } else {
        this.CfwEnvService.open({ name: couponUseUrl });
      }

      return true;
    },
    updateCurrentCoupon(coupon) {
      this.currentCoupon = coupon;
    },
    update(coupon) {
      const curCoupon = coupon || this.currentCoupon;
      const { settingId } = curCoupon;
      this.$emit('update', settingId);
    },
  },
};
</script>

<style lang="scss" scoped>
$imgPath: '~@assets/images/shareswell/';
.swell-coupon-list {
  padding-top: pr(24);
  .coupon-item {
    display: flex;
    align-items: center;
    height: pr(152);
    background: #ffebeb;
    font-family: PingFangSC-Regular;
    border-radius: pr(12);
    position: relative;
    &::after {
      content: '';
      width: pr(24);
      height: 100%;
      position: absolute;
      top: 0;
      left: pr(154);
      z-index: 1;
      background: url($imgPath + 'swell-coupon-division.png') center center no-repeat;
      background-size: 100% 100%;
    }

    .left {
      width: pr(166);
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      .price {
        margin-bottom: pr(8);
        font-size: pr(56);
        color: #f10265;
        font-weight: 900;
        font-family: Avenir-Heavy;
        span {
          margin-left: pr(4);
          font-size: pr(24);
          font-family: PingFangSC-Medium;
        }
      }
      .btn-coupon-use {
        font-size: pr(22);
        line-height: pr(26);
        color: #f10265;
        padding-right: pr(10);
        background: url($imgPath + 'icon-arrow-right.png') right top pr(6) no-repeat;
        background-size: pr(6) pr(14);
      }
    }

    .center {
      flex: 1;
      width: pr(320);
      padding: 0 pr(20) 0 pr(30);
      box-sizing: border-box;
      .title {
        margin-bottom: pr(16);
        font-size: pr(30);
        line-height: pr(36);
        color: #111e36;
        font-family: PingFangSC-Medium;
        font-weight: 600;
        @include ellipsis();
      }
      .desc {
        font-size: pr(24);
        line-height: pr(28);
        color: #828ca0;
        @include ellipsisLn(2);
        width: pr(260);
        max-height: pr(56);
        &.flex {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        img {
          margin-right: pr(6);
          display: inline-block;
          width: pr(24);
          height: pr(24);
        }

        .count-down-text {
          margin-left: pr(8);
        }
      }
    }

    .right {
      flex-shrink: 0;
      margin-right: pr(28);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .status-text {
        margin-bottom: pr(18);
        font-size: pr(22);
        color: #6a6c71;
        line-height: pr(26);
        width: 100%;
        text-align: center;
        span {
          color: #f10265;
        }
      }
      .btn-coupon {
        width: pr(128);
        line-height: pr(56);
        background-image: linear-gradient(90deg, #ff1e6f 0%, #ff0239 100%);
        border-radius: pr(12);
        font-size: pr(24);
        color: #fff;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        &.swell {
          position: relative;
          &::after {
            content: '';
            width: pr(26);
            height: pr(44);
            background: url($imgPath + 'tag-btn-swell.png') center center no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: 0;
            right: pr(-12);
          }
        }
        &.disabled {
          background: #bfc5d2;
        }
      }
    }
  }

  .coupon-item + .coupon-item {
    margin-top: pr(20);
  }
}
</style>
