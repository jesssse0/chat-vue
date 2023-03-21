<template>
  <div class="yi-hai-container">
    <img v-if="isShowImg" :src="imgUrl" @error="onImgError" alt="" />
    <div class="bottom">
      <div class="btn-open" @click="openApp(schemeUrl)">打开APP</div>
    </div>
  </div>
</template>

<script>
import { isCurrentSupport, openSystemBrowser, popAndPushNext, Track } from '@utils';

export default {
  name: 'browser',
  data() {
    return {
      isShowImg: true,
      imgUrl: '',
      schemeUrl: '',
      isClose: false,
      isAutoLink: false,
    };
  },
  created() {
    const { imgUrl, schemeUrl, isClose = false, isAutoLink = false } = this.$route.query;
    this.imgUrl = imgUrl;
    this.schemeUrl = schemeUrl;
    this.isClose = Boolean(Number(isClose));
    this.isAutoLink = Boolean(Number(isAutoLink));
    Track.pvPage.call(this, { siteId: 120, categoryId: 1972, subCategoryId: 25017 });
    Track.pvClick.call(this, '1haicooperation_middlepage_pv');
  },
  mounted() {
    if (this.isAutoLink) {
      this.openApp(this.schemeUrl);
    }
  },
  methods: {
    onImgError() {
      this.isShowImg = false;
    },
    openApp(url = '') {
      Track.pvClick.call(this, '1haicooperation_middlepage_openapp_click');
      if (!url || typeof url !== 'string') {
        this.$toast('缺少跳转链接');
        return;
      }
      if (!isCurrentSupport('11.28.5')) {
        this.$toast('请升级至最新的汽车之家APP或直接下载一嗨租车APP使用', 5000);
        return;
      }
      openSystemBrowser({
        url,
        success: () => {
          console.log('打开成功');
          // 执行关闭操作
          if (this.isClose) {
            popAndPushNext();
          }
        },
        fail: () => {
          this.$toast('请升级至最新的汽车之家APP或直接下载一嗨租车APP使用');
          console.log('打开系统浏览器失败');
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$imgPath: '~@assets/images/yihai/';
.yi-hai-container {
  @media screen and (min-width: 480px) {
    max-width: 375px;
  }
  margin: 0 auto;
  background: #f8f9fc;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  position: relative;
  background: url($imgPath + 'auto-logo.png') center top 40% no-repeat;
  background-size: 50% auto;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
  }
  .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 30%;
    background: #1e80ff;
    background: linear-gradient(
      0deg,
      rgba(32, 108, 254, 1) 0%,
      rgba(32, 108, 254, 0.6) 60%,
      rgba(32, 108, 254, 0) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-open {
      margin-top: pr(100);
      width: pr(450);
      border-radius: pr(12);
      background: #fff;
      font-size: pr(30);
      color: #206cfe;
      text-align: center;
      line-height: pr(100);
      font-weight: 500;
    }
  }
}
</style>
