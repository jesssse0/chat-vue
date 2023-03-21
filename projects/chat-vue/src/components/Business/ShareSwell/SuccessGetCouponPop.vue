<template>
  <PopUp :visible="visible" @closeModal="closeModal">
    <div class="get-success-pop">
      <div class="get-success-pop-content">
        <img src="@assets/images/shareswell/icon-success-pop-bg.png" class="get-success-pop-header" />
        <div class="get-success-pop-title">恭喜您获得</div>
        <div class="get-success-pop-coupon">
          <SuccessCoupon :coupon="coupon" />
        </div>
        <div class="get-success-see" @click="toCouponListHandel">
          奖励已到账，请前往<span>汽车之家-我的-卡券</span>查看
        </div>
        <div class="get-success-pop-get-btn" @click="useHandel">立即使用</div>
      </div>
      <img
        src="@assets/images/shareswell/icon-success-pop-close.png"
        class="get-success-pop-close-btn"
        @click="closeModal"
      />
    </div>
  </PopUp>
</template>

<script>
import PopUp from '../../Base/PopUp.vue';
import SuccessCoupon from './SuccessCoupon.vue';

export default {
  name: 'SuccessGetCouponPop',
  components: {
    PopUp,
    SuccessCoupon,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    useHandel() {
      this.$emit('useClick');
    },
    toCouponListHandel() {
      this.$emit('toCouponListHandel');
    },
  },
};
</script>

<style lang="scss">
.get-success-pop {
  width: pr(630);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.get-success-pop-content {
  width: pr(630);
  //height: pr(500);
  background-color: #ffffff;
  border-radius: pr(16);
  position: relative;
  flex-direction: column;
  padding-top: pr(44);
  padding-bottom: pr(44);
}
.get-success-pop-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: pr(630);
  height: pr(262);
}
.get-success-pop-title {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(36);
  color: #111e36;
  text-align: center;
}
.get-success-pop-coupon {
  margin-top: pr(38);
  margin-left: pr(48);
  margin-right: pr(48);
  height: pr(144);
}
.get-success-see {
  margin-top: pr(38);
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
.get-success-pop-get-btn {
  margin-top: pr(44);
  margin-left: pr(48);
  width: pr(534);
  height: pr(88);
  line-height: pr(88);
  background-image: linear-gradient(90deg, #ff1e6f 0%, #ff0239 100%);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(32);
  color: #ffffff;
  text-align: center;
  border-radius: pr(12);
}
.get-success-pop-close-btn {
  width: pr(52);
  height: pr(52);
  margin-top: pr(80);
}
</style>
