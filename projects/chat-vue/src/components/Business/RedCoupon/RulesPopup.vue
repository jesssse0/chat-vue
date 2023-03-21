<template>
  <van-popup
    v-model="show"
    closeable
    :close-icon="closeIcon"
    round
    safe-area-inset-bottom
    position="bottom"
    :style="style"
    get-container="coupon-activity-container"
    overlay-class="rule-popup"
    @close="onClose"
  >
    <section class="rules-wrapper">
      <div class="header">活动规则</div>
      <div class="content">
        <ul>
          <li v-for="(rule, index) in ruleList" :key="index">
            <p>{{ rule }}</p>
          </li>
        </ul>
      </div>
    </section>
  </van-popup>
</template>

<script>
import { Popup } from 'vant';
import { browserVersions } from '@utils';

const closeIcon = require('@assets/images/redcoupon/icon-close-black.png');

export default {
  name: 'Rule',
  components: {
    [Popup.name]: Popup,
  },
  props: {
    ruleList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    isPC() {
      return !browserVersions().mobile;
    },
    style() {
      const w = window.window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      const result = {
        height: '20.875rem',
        margin: '0 auto',
        right: 0,
      };
      if (w > 480) {
        result.maxWidth = '375px';
      }
      return result;
    },
  },
  data() {
    return {
      show: true,
      closeIcon,
    };
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.rule-popup {
  @media screen and (min-width: 480px) {
    max-width: 375px;
  }
  margin: 0 auto;
  right: 0;
}
.coupon-activity-container {
  .van-popup__close-icon--top-right {
    top: pr(20);
    right: pr(32);
  }
}
</style>
<style lang="scss" scoped>
.rules-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  .header {
    width: 100%;
    height: pr(90);
    background-image: linear-gradient(180deg, rgba(255, 119, 119, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
    box-shadow: inset 0 pr(2) 0 0 #ffffff;
    font-size: pr(34);
    color: #111e36;
    line-height: pr(90);
    text-align: center;
    font-weight: 600;
    @include borderHalf('bottom', #f1f3f6, sticky);
  }

  .content {
    width: 100%;
    flex: 1;
    padding: pr(34) pr(32) pr(50);
    box-sizing: border-box;
    overflow: auto;
    ul {
      li {
        margin-bottom: pr(20);
        &:last-child {
          margin-bottom: 0;
        }
        //h4 {
        //  margin-bottom: pr(20);
        //  font-family: ZapfDingbatsITC;
        //  font-size: pr(28);
        //  color: #111E36;
        //  line-height: pr(40);
        //  font-weight: 500;
        //}
        p {
          margin: 0;
          font-family: PingFangSC-Regular;
          font-size: pr(26);
          color: #464e64;
          line-height: pr(34);
        }
      }
    }
  }
}
</style>
