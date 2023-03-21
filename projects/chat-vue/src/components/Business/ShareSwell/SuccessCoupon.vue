<template>
  <div class="success-coupon">
    <div class="success-content-coupon">
      <div class="success-price-container">
        {{ coupon.couponMoney }}<span>{{ coupon.moneyUnit }}</span>
      </div>
      <img src="@assets/images/shareswell/icon-coupon-success-interval.png" class="success-coupon-interval" />
      <div class="success-coupon-explain">
        <div class="success-coupon-title">{{ coupon.couponTitle }}</div>
        <div class="success-coupon-date">{{ coupon.validDateText }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SuccessCoupon',
  props: {
    coupon: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.success-coupon {
  width: 100%;
  height: 100%;
  padding: pr(6);
  box-sizing: border-box;
  background-image: linear-gradient(90deg, #ff1e6f 0%, #ff0239 100%);
  border-radius: pr(16);
}
.success-content-coupon {
  width: 100%;
  height: 100%;
  border-radius: pr(12);
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
}
.success-price-container {
  width: pr(136);
  height: 100%;
  font-family: Avenir-Heavy;
  font-weight: 900;
  font-size: pr(60);
  color: #f10265;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  span {
    margin-top: pr(17);
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(28);
    color: #f10265;
  }
}
.success-coupon-interval {
  width: pr(24);
  height: pr(136);
  margin-top: pr(-2);
}
.success-coupon-explain {
  height: 100%;
  padding-left: pr(28);
  padding-right: pr(20);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  width: 0;
}
.success-coupon-title {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(28);
  color: #111e36;
  @include ellipsis();
  width: 100%;
}
.success-coupon-date {
  margin-top: pr(16);
  opacity: 0.8;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(24);
  color: #828ca0;
  @include ellipsisLn(2);
  width: 100%;
}
</style>
