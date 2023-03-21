<template>
  <section :class="['coupon', { special: !dataObj.isRealRights }]">
    <div class="content">
      <div class="name">{{ dataObj.couponMainTitle }}</div>
      <div class="price">
        <span>{{ dataObj.couponParValue }}</span
        >{{ dataObj.couponUnit }}
      </div>
      <div class="count">库存{{ dataObj.couponStock }}个</div>
    </div>
    <div class="icon"></div>
    <div
      :class="[
        'btn',
        {
          active: this.btnStatus === 0 || this.btnStatus === 2 || this.btnStatus === 2,
          disable: this.btnStatus === 3 || this.btnStatus === 4 || this.btnStatus === 5,
        },
      ]"
      @click="btnClickHandel"
    >
      {{ btnText }}
    </div>
    <SuccessPop
      :visible="visible"
      :coupon="coupon"
      @useClick="useClick"
      @toCouponListHandel="toCouponListHandel"
      @closeModal="closeModal"
    />
  </section>
</template>
<script>
import { addRemind, takeCoupon, getGrabCouponList } from '@apis/shareswell.api.js';
import { Track } from '@utils';
import {
  GRABCOUPON_GET_CLICK,
  GRABCOUPON_TOUSE_CLICK,
  GRABCOUPON_REMIND_CLICK,
  GRABCOUPON_CANCELREMIND_CLICK,
  GRABCOUPON_GETSUCCESS_POP_SHOW,
  GRABCOUPON_GETSUCCESS_POP_MYCOUPON_CLICK,
  GRABCOUPON_GETSUCCESS_POP_TOUSE_CLICK,
} from '@data/statistic';
import { myCouponUrl } from '@data/index';
import SuccessPop from './SuccessGetCouponPop.vue';

export default {
  name: 'SessionCoupon',
  components: {
    SuccessPop,
  },
  props: {
    dataObj: {
      type: Object,
      default: () => ({}),
    },
    dataKey: {
      type: Number,
      default: 0,
    },
    isGrabing: {
      type: Boolean,
      default: false,
    },
    deviceId: {
      type: String,
      default: '',
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
    activityId: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Number,
      default: 0,
    },
    distanceTime: {
      // 客户端时间 - 服务器时间
      type: Number,
      required: true,
    },
  },
  computed: {
    btnText() {
      // 0:立即领取， 1:已领取，2:未设置提醒， 3:已设置提醒，4:已抢光, 5:已使用
      let btnText = '';
      let status = 4;
      if (this.isGrabing) {
        if (this.dataObj.status === 1) {
          btnText = '立即使用';
          status = 1;
        } else if (this.dataObj.status === 100) {
          btnText = '已使用';
          status = 5;
        } else if (this.dataObj.couponStock === 0) {
          btnText = '已抢光';
          status = 4;
        } else if (this.dataObj.status === 0) {
          btnText = '立即领取';
          status = 0;
        }
      } else if (this.dataObj.status === 3) {
        btnText = '取消提醒';
        status = 3;
      } else {
        btnText = '开抢提醒';
        status = 2;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.btnStatus = status;
      return btnText;
    },
  },
  data() {
    return {
      btnStatus: 4,
      visible: false,
      coupon: {},
    };
  },
  methods: {
    btnClickHandel() {
      if (this.btnStatus === 2 || this.btnStatus === 3) {
        if (this.btnStatus === 2) {
          if (new Date().getTime() - this.distanceTime >= this.startTime) {
            this.$toast('福利时段已变化，快刷新页面来抢吧！');
          }
          Track.pvClick.call(this, GRABCOUPON_REMIND_CLICK);
        } else {
          Track.pvClick.call(this, GRABCOUPON_CANCELREMIND_CLICK);
        }
        this.addRemind();
      } else if (this.btnStatus === 1) {
        Track.pvClick.call(this, GRABCOUPON_TOUSE_CLICK);
        if (this.dataObj.couponUseUrl) {
          if (/^autohome/.test(this.dataObj.couponUseUrl)) {
            window.location.href = this.dataObj.couponUseUrl;
          } else {
            this.CfwEnvService.open({ name: this.dataObj.couponUseUrl });
          }
        }
      } else if (this.btnStatus === 0) {
        Track.pvClick.call(this, GRABCOUPON_GET_CLICK, {
          couponType: this.dataObj.couponTypeName,
          couponMoney: this.dataObj.couponParValue,
        });
        this.getCoupon();
      }
    },
    // 开抢提醒、取消提醒
    async addRemind() {
      try {
        if (this.CfwEnvService.isAutoApp()) {
          let deviceid = this.deviceId;
          if (!this.deviceId) {
            const deviceInfo = await this.CfwEnvService.getDeviceInfo();
            deviceid = deviceInfo.deviceid;
          }
          const res = await addRemind({
            code: this.$route.query.code || '',
            device: deviceid,
            settingId: this.dataObj.settingId,
            time: this.startTime,
          });
          if (res && res.returncode === 0) {
            const status = res.result === 0 ? 3 : 4;
            if (status === 3) {
              this.$toast('提醒已设置，将在开始前5分钟提醒您');
            }
            this.$emit('changeData', this.dataKey, { ...this.dataObj, status });
          } else {
            throw res;
          }
        }
      } catch (e) {
        console.log(e, '提醒操作失败');
        this.$toast(e.message || '操作失败');
      }
    },
    // 领取优惠券
    async getCoupon() {
      try {
        let deviceid = this.deviceId;
        if (!this.deviceId) {
          const deviceInfo = await this.CfwEnvService.getDeviceInfo();
          deviceid = deviceInfo.deviceid;
        }
        const res = await takeCoupon({
          actionType: 1,
          userId: this.userInfo.userId,
          mobile: this.userInfo.userPhone,
          deviceId: deviceid,
          couponSettingId: this.dataObj.settingId,
        });
        this.getUpdateCoupon();
        if (res && res.returncode === 0) {
          this.visible = true;
          this.coupon = res.result && res.result[0];
          Track.pvClick.call(this, GRABCOUPON_GETSUCCESS_POP_SHOW);
        } else {
          throw res;
        }
      } catch (e) {
        this.$toast(e.message || '操作失败');
      }
    },
    // 领取成功，获取新的优惠券信息
    async getUpdateCoupon() {
      try {
        const res = await getGrabCouponList({ activityId: this.activityId, settingId: this.dataObj.settingId });
        if (res && res.returncode === 0) {
          const { result } = res;
          let newObj = { ...this.dataObj, status: 1 };
          if (result && result[0] && result[0].couponList && result[0].couponList[0]) {
            // eslint-disable-next-line prefer-destructuring
            newObj = result[0].couponList[0];
          }
          this.$emit('changeData', this.dataKey, { ...newObj });
        } else {
          throw res;
        }
      } catch (e) {
        console.log(e, '更新优惠券失败');
        this.$toast(e.message || '领取失败');
      }
    },

    // 关闭领取弹窗
    closeModal() {
      this.visible = false;
    },

    // 领取成功弹窗立即使用按钮
    useClick() {
      Track.pvClick.call(this, GRABCOUPON_GETSUCCESS_POP_TOUSE_CLICK);
      if (this.coupon.useUrl) {
        if (/^autohome/.test(this.coupon.useUrl)) {
          window.location.href = this.coupon.useUrl ;
        } else {
          this.CfwEnvService.open({ name: this.coupon.useUrl });
        }
      }
    },

    // 领取成功弹窗，跳转主软卡券
    toCouponListHandel() {
      Track.pvClick.call(this, GRABCOUPON_GETSUCCESS_POP_MYCOUPON_CLICK);
      if (/^autohome/.test(myCouponUrl)) {
        window.location.href = myCouponUrl ;
      } else {
        this.CfwEnvService.open({ name: myCouponUrl });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.coupon {
  flex-shrink: 0;

  width: pr(314);
  height: pr(164);
  background: #ffebeb;
  border-radius: pr(12);

  box-sizing: border-box;
  padding: pr(20) pr(24);

  display: flex;
  justify-content: space-between;

  position: relative;

  padding-right: pr(108);

  margin-bottom: pr(20);

  .content {
    padding-right: pr(10);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    .name {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: pr(24);
      color: #111e36;
      @include ellipsis();
    }

    .price {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: pr(24);
      color: #f10265;
      white-space: nowrap;
      @include ellipsis();

      span {
        font-family: Avenir-Heavy;
        font-weight: 900;
        font-size: pr(56);
        color: #f10265;
      }
    }

    .count {
      font-family: PingFangSC-Light;
      font-weight: 300;
      font-size: pr(24);
      color: #828ca0;
      @include ellipsis();
    }
  }

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: pr(84);
    width: pr(24);
    background: url(../../../assets/images/shareswell/icon-coupon-day.png) center center;
    background-size: 100% 100%;
  }

  .btn {
    position: absolute;
    top: 50%;
    right: pr(24);
    transform: translate(0, -50%);

    text-align: justify;
    writing-mode: vertical-lr;
    width: pr(48);
    height: pr(124);
    background-image: linear-gradient(180deg, #ff1e6f 0%, #ff0239 100%);
    border-radius: pr(12);

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: pr(24);
    color: #ffffff;

    &.active {
      background-image: linear-gradient(180deg, #ff1e6f 0%, #ff0239 100%);
    }

    &.disable {
      background: #bfc5d2;
    }
  }
}

.special {
  background: #ff1656;

  .content {
    .name {
      color: #ffffff;
    }

    .price {
      color: #ffffff;

      span {
        color: #ffffff;
      }
    }

    .count {
      color: #ffffff;
    }
  }

  .icon {
    background: url(../../../assets/images/shareswell/icon-coupon-red.png) center center;
    background-size: 100% 100%;
  }

  .btn {
    background: rgba(255, 255, 255, 0.3);
    &.active {
      background: rgba(255, 255, 255, 0.3);
    }

    &.disable {
      opacity: 0.6;
    }
  }
}
</style>
