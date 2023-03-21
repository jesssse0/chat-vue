<template>
  <PopUp :visible="show" @closeModal="$emit('onShare')">
    <div class="share-copy-pop">
      <h3 class="title">邀请好友助力</h3>
      <p class="sub-title">好友使用汽车之家APP打开才算成功</p>
      <div class="copy-box">{{ kouLing }}</div>
      <div class="btn-share" @click="onShare">去微信粘贴给好友</div>

      <i class="icon-close" @click="$emit('onClose')"></i>
    </div>
  </PopUp>
</template>

<script>
import PopUp from '@components/Base/PopUp.vue';
import Clipboard from 'clipboard';
import { Track } from '@utils';
import { SHARESWELL_PASSWORD_POP_SHOW, SHARESWELL_PASSWORD_POP_CLICK } from '@data/statistic.js';

export default {
  name: 'ShareCopy',
  components: {
    PopUp,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    kouLing: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    Track.pvClick.call(this, SHARESWELL_PASSWORD_POP_SHOW);
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onShare() {
      Track.pvClick.call(this, SHARESWELL_PASSWORD_POP_CLICK);
      const $this = this;
      const clipboard = new Clipboard('.btn-share', {
        text() {
          return $this.kouLing;
        },
      });
      clipboard.on('success', (e) => {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        window.location.href = 'weixin://';
        // e.clearSelection();
        clipboard.destroy();
        this.onClose();
      });
      clipboard.on('error', (e) => {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        this.$toast('复制失败');
        clipboard.destroy();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$imgPath: '~@assets/images/shareswell/';
.share-copy-pop {
  position: relative;
  width: pr(630);
  padding: pr(40) pr(48) pr(48);
  box-sizing: border-box;
  background: #fff url($imgPath + 'share-copy-bg.png') center top no-repeat;
  background-size: 100% auto;
  border-radius: pr(16);
  text-align: center;
  font-family: PingFangSC-Regular;
  .title {
    margin-bottom: pr(24);
    font-size: pr(36);
    color: #111e36;
    font-weight: 600;
    line-height: pr(44);
  }
  .sub-title {
    margin-bottom: pr(28);
    font-size: pr(28);
    color: #828ca0;
    line-height: pr(36);
  }
  .copy-box {
    margin-bottom: pr(52);
    background: #f8f9fc;
    border-radius: pr(16);
    padding: pr(20);
    box-sizing: border-box;
    font-size: pr(28);
    color: #464e64;
    line-height: 1.5;
    word-break: break-all;
    text-align: left;
  }
  .btn-share {
    line-height: pr(88);
    background-image: linear-gradient(90deg, #ff1e6f 0%, #ff0239 100%);
    border-radius: pr(12);
    font-size: pr(32);
    color: #fff;
    font-weight: 600;
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
}
</style>
