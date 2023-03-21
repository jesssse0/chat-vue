<template>
  <div class="m-activity-container" @click="openApp">
    <img v-if="activityImg" :src="activityImg" alt="" />
  </div>
</template>

<script>
// M站活动静态页，点击任意位置跳转中间页
import { Track } from '@utils';

export default {
  name: 'mactivity',
  data() {
    return {
      activityImg: '',
      deeplink: '',
    };
  },
  created() {
    const { activityImg, deeplink } = this.$route.query;
    this.activityImg = activityImg || '';
    this.deeplink = deeplink || '';
    Track.pvPage.call(this, { siteId: 120, categoryId: 1972, subCategoryId: 25016 });
    Track.pvClick.call(this, 'oct_activity_home_page_m_pv');
  },
  methods: {
    openApp() {
      if (!this.deeplink) {
        console.log('deeplink地址不存在，请传入deeplink地址');
        return;
      }
      window.location.href = this.deeplink;
    },
  },
};
</script>

<style lang="scss" scoped>
$imgPath: '~@assets/images/yihai/';
.m-activity-container {
  @media screen and (min-width: 480px) {
    max-width: 375px;
  }
  margin: 0 auto;
  min-height: 100vh;
  background: rgba(108, 150, 247, 1) url($imgPath + 'auto-logo.png') center top 40% no-repeat;
  background-size: 50% auto;
  img {
    display: block;
    width: 100%;
  }
}
</style>
