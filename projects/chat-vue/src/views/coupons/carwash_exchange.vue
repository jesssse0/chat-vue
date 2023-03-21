<template>
  <section class="coupon-bg">
    <UnLoginMask />
    <div class="coupon-exchange-container">
      <div class="header">券码兑换</div>
      <section class="panel">
        <div class="exchange-wrapper">
          <input type="text" v-model="form.codeNo" maxlength="5" placeholder="请输入兑换码" />
          <div class="btn-exchange" @click="getWashCarCode">立即兑换</div>
        </div>
        <div class="q-a-wrapper">
          <div class="title">兑换说明</div>
          <ul class="usage-list">
            <li class="usage-item">在当前页面输入兑换码，即可兑换洗车券。</li>
            <li class="usage-item">一个兑换码仅能兑换一次，不可重复兑换。</li>
            <li class="usage-item">兑换成功后，可在“洗车首页-我的订单”查看。</li>
            <li class="usage-item">到店消费时，请将“订单详情-洗车券码”出示给店员进行核销。</li>
            <li class="usage-item">洗车券需在有效期内使用，过期作废，有效期请在“订单详情”中查看。</li>
            <li class="usage-item">已兑换订单不支持退款。</li>
            <li class="usage-item">如有疑问请联系客服：400-961-6666 ，活动最终解释权归汽车之家所有。</li>
          </ul>
        </div>
      </section>

      <!-- loading -->
      <!-- <loading :com="loadingObj"></loading> -->
    </div>
    <PopUpConfirm
      :visible="isShowFailConfirm"
      title="兑换失败"
      :content="failContent"
      btntitle="我知道了"
      @closeModal="closeModal"
      @btnClick="closeModal"
    />
    <Loading :loadingObj="loadingObj" />
  </section>
</template>
<script>
import UnLoginMask from '@components/Base/UnLoginMask.vue';
import Loading from '@components/Base/Loading.vue';
import PopUpConfirm from '@components/Business/ExchangeCoupon/ExchangeCouponPop.vue';
import { getWashCarCode } from '@apis/coupons.api';
import { getUserInfo } from '@apis/common.api';
import { Track } from '@utils';
import { XICHE_EXCHANGE } from '@data/statistic';

export default {
  name: 'CarwashCoupon',
  components: {
    UnLoginMask,
    PopUpConfirm,
    Loading,
  },
  data() {
    return {
      form: {
        mobile: '',
        userId: '',
        codeNo: '',
        businessType: 1,
      },
      isShowFailConfirm: false,
      failContent: '请确认兑换码是否正确',
      orderNum: '',
      isClicked: false,
      loadingObj: {
        loadingState: 0,
        dataHint: '兑换中...',
      },
    };
  },
  created() {
    this.CfwEnvService.setTitle('汽车之家标准洗车券');
    this.init();
    const siteId = 120;
    const categoryId = 1954;
    const subCategoryId = 25031;
    Track.pvPage.call(this, { siteId, categoryId, subCategoryId });
    Track.pvClick.call(this, XICHE_EXCHANGE);
  },
  methods: {
    async init() {
      if (this.form.userId) {
        return false;
      }
      const { result } = await getUserInfo();
      console.log(result, 'result');

      if (result && result.userId) {
        // 已登录
        this.form.userId = result.userId;
        console.log(this.form, 'qqq');
      }
      return true;
    },
    // 券码兑换
    getWashCarCode() {
      console.log('执行券码兑换');
      if (this.isClicked) return false;
      this.isClicked = true;
      setTimeout(() => {
        this.isClicked = false;
      }, 1000);

      if (this.form.codeNo === '') {
        this.$toast('兑换码不能为空');
        return false;
      }
      this.loadingObj.loadingState = 1;
      getWashCarCode(this.form)
        .then((res) => {
          this.loadingObj.loadingState = 0;
          if (res.returncode === 0) {
            const orderNum = res.result;
            const { pvareaid } = this.$route.query;
            this.$router.push({
              name: 'exchange_success',
              query: { orderNum, pvareaid },
            });
            return false;
          }
          return Promise.reject(res);
        })
        .catch((err) => {
          this.loadingObj.loadingState = 0;
          this.isShowFailConfirm = true;
          this.failContent = err.message || '请确认兑换码是否正确';
        });
      return false;
    },
    // 关闭弹窗
    closeModal() {
      this.isShowFailConfirm = false;
    },
  },
};
</script>
<style lang="scss">
@import '@assets/style/coupons/carwash_exchange.scss';
</style>
