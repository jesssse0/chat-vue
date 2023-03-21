<template>
  <section class="form-container">
    <h3 class="title">领取车主福利</h3>
    <img class="display-coupon" v-if="couponImg" :src="couponImg" alt="" />
    <div class="btn-wrapper">
      <div class="btn btn-use" v-throttle="verifyParams">{{ submitText }}</div>
      <label class="user-policy">
        <input type="checkbox" v-model="privatePolicy" />
        <span class="icon-check"></span>
        <div class="policy-text">
          已阅读并同意<a @click.prevent="openProtocol('personal')">《个人信息保护说明》</a>和<a @click.prevent="openProtocol('privacy')">《汽车之家隐私政策》</a>
        </div>
      </label>
    </div>
  </section>
</template>

<script>
import { RED_COUPON_TAKE_COUPON } from '@data/statistic';
import { protocolObj } from '@data';
import { Track } from '@utils';
import { Popover } from 'vant';
import { isJSON } from '@utils/stringHelper';

export default {
  name: 'NoForm',
  components: {
    [Popover.name]: Popover,
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          isLogin: false,
          userMobile: '',
        };
      },
    },
    activityInfo: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  data() {
    return {
      privatePolicy: false,
    };
  },
  computed: {
    submitText() {
      const { submitText = '立即领取' } = this.activityInfo;
      return submitText;
    },
    couponImg() {
      let { couponImg } = this.activityInfo;
      couponImg = isJSON(couponImg) ? JSON.parse(couponImg) : '';
      if (Array.isArray(couponImg) && couponImg.length > 0) {
        [couponImg] = couponImg;
      }
      return couponImg;
    },
  },
  created() {},
  methods: {
    openProtocol(type) {
      // personal -> 用户协议，privacy -> 隐私政策
      this.CfwEnvService.open(protocolObj[type]);
    },
    verifyParams() {
      Track.pvClick.call(this, RED_COUPON_TAKE_COUPON);
      // TODO 暂时不校验登录
      if (!this.userInfo.isLogin) {
        this.$emit('go-login');
        return;
      }
      if (!this.privatePolicy) {
        this.$toast('请阅读并同意协议');
        return;
      }
      this.$emit('rights-take-coupon');
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../../assets/style/core/_reset.scss';
$imgPath: '~@assets/images/redcoupon/';
.form-container {
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

  .display-coupon {
    margin-bottom: pr(32);
    display: block;
    width: 100%;
  }

  .btn-wrapper {
    .btn {
      width: 100%;
      height: pr(88);
      border-radius: pr(48);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: pr(36);
      font-weight: 500;

      &.btn-use {
        background-color: #ee3d29;
        background-image: radial-gradient(at 130% 10%, #ffc35c 10%, rgba(255, 172, 107, 0) 80%),
          linear-gradient(90deg, #fe4242 0%, #ee3d29 100%);
        box-shadow: inset pr(2) pr(-6) pr(10) 0 rgba(255, 255, 255, 0.3);
        color: #fff;
      }
    }

    .user-policy {
      margin-top: pr(28);
      font-size: pr(22);
      color: #666c80;
      line-height: pr(28);
      text-align: center;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      input {
        display: none;
      }
      input + span {
        display: block;
        margin-right: pr(8);
        width: pr(24);
        height: pr(24);
        background: url($imgPath + 'icon-unselected.png') no-repeat;
        background-size: 100% 100%;
      }
      input:checked + span {
        background-image: url($imgPath + 'icon-selected.png');
      }

      .policy-text {
        flex: 1;
        text-align: center;
      }
      a {
        color: #ff5648;
      }
    }
  }
}
</style>
