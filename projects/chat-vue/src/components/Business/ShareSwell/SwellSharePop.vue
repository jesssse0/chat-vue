<template>
  <PopUp :visible="visible" @closeModal="closeModal">
    <div class="swell-share-pop">
      <div class="swell-share-pop-content">
        <img src="@assets/images/shareswell/icon-success-pop-bg.png" class="swell-share-pop-header" />
        <div class="swell-share-pop-title">恭喜获得优惠</div>
        <div class="swell-share-pop-subtitle">
          分享给好友助力，即可膨胀至<span>{{ coupon.bulkCouponParValue }}{{ coupon.couponUnit }}</span>
        </div>
        <div class="swell-share-pop-swell-container">
          <div class="swell-share-pop-before">
            <div class="swell-share-pop-before-price">
              {{ coupon.couponParValue }}<span>{{ coupon.couponUnit }}</span>
            </div>
            <div v-if="coupon.ruleText" class="swell-share-pop-before-tip">{{ coupon.ruleText }}</div>
          </div>
          <img src="@assets/images/shareswell/icon-swell-pop-arrow.png" class="swell-share-pop-arrow" />
          <div class="swell-share-pop-after">
            <div class="swell-share-pop-after-price">
              {{ coupon.bulkCouponParValue }}<span>{{ coupon.couponUnit }}</span>
            </div>
            <div v-if="coupon.bulkCouponRuleText" class="swell-share-pop-after-tip">
              {{ coupon.bulkCouponRuleText }}
            </div>
          </div>
        </div>
        <div class="swell-share-pop-share-btn" v-throttle="onShareSwell">
          免费膨胀
          <div v-if="coupon.helperWelfareText" class="swell-share-pop-btn-tip">{{ coupon.helperWelfareText }}</div>
        </div>

        <i class="icon-close" @click="closeModal"></i>
      </div>
    </div>
  </PopUp>
</template>

<script>
import { Track } from '@utils';
import { SHARESWELL_SWELL_POP_SHOW, SHARESWELL_SWELL_POP_CLICK } from '@data/statistic.js';
import PopUp from '../../Base/PopUp.vue';

export default {
  name: 'SwellSharePop',
  components: {
    PopUp,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    Track.pvClick.call(this, SHARESWELL_SWELL_POP_SHOW);
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    onShareSwell() {
      Track.pvClick.call(this, SHARESWELL_SWELL_POP_CLICK);
      this.$emit('shareSwell');
      this.$emit('closeModal');
    },
  },
};
</script>
<style lang="scss">
$imgPath: '~@assets/images/shareswell/';
.swell-share-pop {
  width: pr(630);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.swell-share-pop-content {
  width: pr(630);
  //height: pr(500);
  background-color: #ffffff;
  border-radius: pr(16);
  position: relative;
  flex-direction: column;
  padding-top: pr(42);
  padding-bottom: pr(48);
}
.swell-share-pop-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: pr(630);
  height: pr(262);
}
.swell-share-pop-title {
  color: #111e36;
  font-size: pr(36);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
}
.swell-share-pop-subtitle {
  margin-top: pr(32);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(28);
  color: #828ca0;
  text-align: center;
  span {
    color: #f10265;
  }
}
.swell-share-pop-swell-container {
  margin-left: pr(48);
  margin-right: pr(48);
  margin-top: pr(32);
  height: pr(200);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.swell-share-pop-before {
  margin-top: pr(32);
  width: pr(196);
  height: pr(168);
  background: url($imgPath + 'icon-swell-pop-before.png') no-repeat;
  background-size: 100% 100%;
  flex-direction: column;
}
.swell-share-pop-before-price {
  margin-top: pr(24);
  font-family: Avenir-Heavy;
  font-weight: 900;
  font-size: pr(52);
  color: #f10265;
  text-align: center;
  span {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(24);
    color: #f10265;
  }
}
.swell-share-pop-before-tip {
  padding: 0 pr(10);
  box-sizing: border-box;
  margin-top: pr(8);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(22);
  color: #828ca0;
  text-align: center;
  @include ellipsis();
}
.swell-share-pop-arrow {
  margin-top: pr(86);
  width: pr(54);
  height: pr(28);
  display: block;
}
.swell-share-pop-after {
  width: pr(232);
  height: pr(200);
  background: url($imgPath + 'icon-swell-pop-after.png') no-repeat;
  background-size: 100% 100%;
}
.swell-share-pop-after-price {
  margin-top: pr(28);
  font-family: Avenir-Heavy;
  font-weight: 900;
  font-size: pr(60);
  color: #f10265;
  text-align: center;
  span {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: pr(28);
    color: #f10265;
  }
}
.swell-share-pop-after-tip {
  padding: 0 pr(10);
  box-sizing: border-box;
  margin-top: pr(12);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: pr(26);
  color: #828ca0;
  text-align: center;
  @include ellipsis();
}
.swell-share-pop-share-btn {
  margin-top: pr(68);
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
  position: relative;
}
.swell-share-pop-btn-tip {
  position: absolute;
  height: pr(46);
  top: pr(-28);
  right: pr(0);
  background-color: #ffd833;
  border-radius: pr(24) pr(24) pr(24) pr(0);
  padding-left: pr(24);
  padding-right: pr(24);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: pr(22);
  color: #700900;
  text-align: center;
  line-height: pr(46);
}
.icon-close {
  position: absolute;
  left: 50%;
  bottom: pr(-132);
  transform: translateX(-50%);
  width: pr(52);
  height: pr(52);
  background: url($imgPath + '/icon-success-pop-close.png') center center no-repeat;
  background-size: 100% 100%;
}
</style>
