<template>
  <PopUp :visible="visible" @closeModal="closeModal">
    <div class="exchange-coupon-pop-container">
      <div class="exchange-coupon-pop-title">{{title}}</div>
      <div class="exchange-coupon-pop-content">{{content}}</div>
      <div class="exchange-coupon-pop-btn" @click="btnClick">{{btntitle}}</div>
      <div v-on:click="closeModal" class="exchange-coupon-pop-close-container">
        <img class="exchange-coupon-pop-close-icon" src="@assets/images/coupon_exchange/icon-exchange-coupon-close.png" alt=""/>
      </div>
    </div>
  </PopUp>
</template>

<script>
import PopUp from '../../Base/PopUp.vue';

export default {
  name: "ExchangeCouponPop",
  components: {
    PopUp,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
    content: {
      type: String,
      default: '内容',
    },
    btntitle: {
      type: String,
      default: '按钮',
    },
  },
  created() {
    console.log(this.title);
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    btnClick() {
      this.$emit('btnClick');
    },
  },
};
</script>

<style lang="scss">
.exchange-coupon-pop-container{
  width: pr(480);
  //height: pr(400);
  padding: pr(40);
  background: #FFFFFF;
  border-radius: pr(24);
  display: flex;
  //align-items: center;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
}
.exchange-coupon-pop-title {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(34);
  color: #111E36;
  text-align: center;
  margin-top: pr(24);
}
.exchange-coupon-pop-content{
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(30);
  line-height: pr(38);
  margin-top: pr(34);
  color: #666D7F;
  text-align: center;
}
.exchange-coupon-pop-btn {
  margin-top: pr(44);
  width: pr(400);
  height: pr(88);
  line-height: pr(88);
  background-image: linear-gradient(270deg, #206CFE 0%, #4C88FF 100%);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(32);
  color: #ffffff;
  text-align: center;
  border-radius: pr(12);
}
.exchange-coupon-pop-close-container{
  position: absolute;
  top: 0;
  right: 0;
  width: pr(80);
  height: pr(80);
  background: #00000000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.exchange-coupon-pop-close-icon {
  height: pr(24);
  width: pr(24);
  display: block;
}
</style>
