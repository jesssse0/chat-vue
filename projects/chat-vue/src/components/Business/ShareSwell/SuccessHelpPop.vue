<template>
  <PopUp :visible="visible" @closeModal="closeModal">
    <div class="help-success-pop">
      <div class="help-success-pop-content">
        <img src="@assets/images/shareswell/icon-success-pop-bg.png" class="help-success-pop-header" />
        <div class="help-success-pop-title">谢谢你帮我助力</div>
        <div class="help-success-pop-subtitle">也送您一张<span>车主权益优惠券</span></div>
        <div class="help-success-pop-coupon">
          <SuccessCoupon :coupon="coupon"/>
        </div>
        <div class="help-success-pop-get-btn" @click="getSameWelfare">获得同款福利</div>
        <div class="help-success-pop-use-btn" @click="gotoUseCoupon">立即使用</div>
      </div>
      <img
        src="@assets/images/shareswell/icon-success-pop-close.png"
        class="help-success-pop-close-btn"
        @click="closeModal"
      />
    </div>
  </PopUp>
</template>

<script>
import PopUp from '../../Base/PopUp.vue';
import SuccessCoupon from './SuccessCoupon.vue';

export default {
  name: 'SuccessHelpPop',
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
      default: ()=>({}),
    }
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    getSameWelfare() {
      this.$emit('getSameWelfare','pop');
    },
    gotoUseCoupon() {
      this.$emit('gotoUseCoupon','pop');
    },
  },
};
</script>

<style lang="scss">
.help-success-pop {
  width: pr(630);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.help-success-pop-content {
  width: pr(630);
  //height: pr(500);
  background-color: #ffffff;
  border-radius: pr(16);
  position: relative;
  flex-direction: column;
  padding-top: pr(42);
  padding-bottom: pr(8);
}
.help-success-pop-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: pr(630);
  height: pr(262);
}
.help-success-pop-title {
  color: #111e36;
  font-size: pr(36);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
}
.help-success-pop-subtitle {
  margin-top: pr(32);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #828ca0;
  font-size: pr(28);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  span {
    font-weight: 500;
    color: #f10265;
    font-family: PingFangSC-Medium;
  }
}
.help-success-pop-coupon {
  margin-top: pr(44);
  margin-left: pr(48);
  margin-right: pr(48);
  height: pr(144);
}
.help-success-pop-get-btn {
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
.help-success-pop-use-btn {
  margin-top: pr(8);
  margin-left: pr(48);
  width: pr(534);
  height: pr(88);
  line-height: pr(88);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(28);
  color: #828ca0;
  text-align: center;
}
.help-success-pop-close-btn {
  width: pr(52);
  height: pr(52);
  margin-top: pr(80);
}
</style>
