<script>
import { shareDefaultImg } from '@data';

export default {
  name: 'Share',
  render() {
    return '';
  },
  props: {
    shareConfig: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    shareOption() {
      return {
        pageName: '页面名称',
        title: '分享title',
        content: '分享content',
        url: window.location.href,
        platform: 'weixin&weixincircle',
        imgurl: shareDefaultImg,
        success() {
          console.log('分享成功了111');
        },
        fail() {
          console.log('分享失败了111');
        },
        ...this.shareConfig,
      };
    },
  },
  methods: {
    setShare() {
      if (this.CfwEnvService.isWeChat()) {
        window.wx.ready(() => {
          this.CfwEnvService.setWxShares(this.shareOption);
        });
      } else if (this.CfwEnvService.isAliMinProgram()) {
        window.my.postMessage({
          agreement: 'makeShareInfo',
          data: {
            title: this.shareOption.title,
            desc: this.shareOption.content,
            content: '',
            imageUrl: this.shareOption.imgurl,
            bgImgUrl: this.shareOption.bgImgUrl,
            link: this.shareOption.url
          }
        });
      } else {
        this.CfwEnvService.setShare(this.shareOption);
      }
    },
    onShare() {
      if (this.CfwEnvService.isMainApp()) {
        this.CfwEnvService.share(this.shareOption);
      }
    },
  },
};
</script>

<style scoped></style>
