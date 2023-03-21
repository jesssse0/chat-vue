<template>
  <div class="m-activity-container" @click="openApp">
    <img :src="activityImg || '//x.autoimg.cn/cfw/cfw/assets/minpage-img.png?format=web'" alt="" />
    <div v-if="!isSupport" class="tips">
      <p>当前App版本过低</p>
      <p>请升级至最高版本参加此活动</p>
    </div>
  </div>
</template>

<script>
// M站活动静态页，点击任意位置跳转中间页
import { isCurrentSupport, Track } from '@utils';

export default {
  name: 'mactivity',
  data() {
    return {
      activityImg: '',
      deeplink: '',
      isAutoApp: this.CfwEnvService.isAutoApp(),
      isSupport: true,
    };
  },
  created() {
    const { activityImg, deeplink } = this.$route.query;
    this.activityImg = activityImg || '';
    this.deeplink = deeplink || '';
    Track.pvPage.call(this, { siteId: 120, categoryId: 1972, subCategoryId: 25016 });
    Track.pvClick.call(this, 'oct_activity_home_page_m_pv');
    if (this.isAutoApp) {
      this.openApp();
    }
  },
  methods: {
    openApp() {
      if (!this.deeplink) {
        console.log('deeplink地址不存在，请传入deeplink地址');
        return;
      }
      if (this.isAutoApp) {
        if (!isCurrentSupport('11.22.5')) {
          // this.$toast('请升级至最新的汽车之家APP', 5000);
          this.isSupport = false;
          return;
        }
        let url = this.deeplink;
        if (/^https?/.test(this.deeplink)) {
          url = `autohome://insidebrowserwk?url=${encodeURIComponent(this.deeplink)}`;
        } else if (/^rn/.test(this.deeplink)) {
          url = `autohome://rninsidebrowser?url=${encodeURIComponent(this.deeplink)}`;
        }
        if (window.AHAPP) {
          window.AHAPP.invokeNative('pop', {
            url,
            actiontype: 'present', // 执行的动作
            showtype: 'push', // 展示的类型,push：表示压栈显示 present：表示模态显示
            success(result) {
              console.log(JSON.stringify(result)); // 打印客户端返回的参数内容
            },
            fail(result) {
              console.log(JSON.stringify(result));
            }
          });
        }
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
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  // background: rgba(108, 150, 247, 1) url($imgPath + 'auto-logo.png') center top 40% no-repeat;
  background-size: 50% auto;
  img {
    display: block;
    width: 100%;
  }
  .tips {
    position: absolute;
    top: pr(800);
    left: 50%;
    transform: translateX(-50%);
    z-inex: 100;
    width: pr(710);
    height: pr(462);
    background-color: rgba(255, 255, 255, .9);
    border-radius: pr(40);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      font-size: pr(35);
      color: #12285B;
      line-height: pr(60);
    }
  }
}
</style>
