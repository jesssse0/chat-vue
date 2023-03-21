<template>
  <div class="display-pc-container">
    <img :src="downloadUrl" alt="" />
    <p>请使用手机扫码查看</p>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: 'DisplayPC',
  props: {
    originUrl: {
      type: String,
      default:
        'https://z.autoimg.cn/h5callapp/main/chomme.html?img_src=https://z.autoimg.cn/h5callapp/main/images/bg_xiche_nobtn.jpg&plan_id=120&scheme_url=autohome%3A%2F%2Frninsidebrowser%3Furl%3Drn%3A%2F%2FMallBuy%2FInquiryNew%3Fpvareaid%3D6849871&extra_kwargs=%7B%7D&short_id=NrQSb2c',
      required: true,
    },
  },
  data() {
    return {
      downloadUrl: '',
    };
  },
  created() {
    QRCode.toDataURL(this.originUrl, {
      errorCorrectionLevel: 'M',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      color: {
        dark: '#000',
        light: '#fff',
      },
    })
      .then((url) => {
        console.log(url);
        this.downloadUrl = url;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.display-pc-container {
  margin-top: pr(32);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin-bottom: pr(24);
    display: block;
    width: pr(400);
  }
  p {
    // margin: 0;
    font-size: pr(28);
    color: #828ca0;
    line-height: pr(40);
  }
}
</style>
