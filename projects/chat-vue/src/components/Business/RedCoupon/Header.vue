<template>
  <section class="advanced-header-container" :style="{ paddingBottom: `${ratio}%` }">
    <img :src="bannerImg" alt="" />
  </section>
</template>

<script>
import { isJSON } from '@utils/stringHelper';

export default {
  name: 'Header',
  props: {
    bannersList: {
      type: String,
      default: '',
    },
  },
  computed: {
    // 取第一张图
    bannerImg() {
      if (isJSON(this.bannersList)) {
        const bannersList = JSON.parse(this.bannersList);
        if (bannersList.length > 0) {
          return bannersList[0];
        }
        return '';
      }
      return '';
    },
    // 图片占位比例
    ratio() {
      const match = this.bannerImg.match(/&r=([^|$]*)/);
      return match ? match[1] : 109.06667;
    },
  },
};
</script>

<style lang="scss" scoped>
.advanced-header-container {
  width: 100%;
  height: 0;
  padding-bottom: 109.06667%;
  overflow: hidden;
  position: relative;
  background: url('//s.autoimg.cn/as/static/holdimg_white.png') center center no-repeat;
  background-size: 50% auto;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
