<template>
  <div class="success-container">
    <img class="success-icon" src="@assets/images/coupon_exchange/icon-exchange-coupon-success-finished.png" alt="" />
    <div class="success-title">恭喜您，预约成功</div>
    <div class="success-btn-container">
      <div class="success-to-detail" @click="toOrderDetail">查看券码</div>
      <div class="success-back-home" @click="openAutoHomeApp">领取更多权益</div>
    </div>
  </div>
</template>

<script>
import { YOUCHE_HOST } from '@apis/host.config';
import { Track } from '@utils';
import { XICHE_EXCHANGE_SUCCESS_PV, XICHE_DINGDAN_CLICK, XICHE_GENGDUOQUANYI_CLICK } from '@data/statistic';

export default {
  name: 'success',
  props: {},
  computed: {},
  components: {},
  data() {
    return {
      source: this.$route.query.source || '',
      pvareaid: this.$route.query.pvareaid || '',
      orderNum: this.$route.query.orderNum || '',
    };
  },
  created() {
    this.CfwEnvService.setTitle(this.$route.query.title || '预约成功');
    const siteId = 120;
    const categoryId = 1954;
    const subCategoryId = 25031;
    Track.pvPage.call(this, { siteId, categoryId, subCategoryId });
    Track.pvClick.call(this, XICHE_EXCHANGE_SUCCESS_PV);
  },
  methods: {
    openAutoHomeApp() {
      Track.pvClick.call(this, XICHE_GENGDUOQUANYI_CLICK);
      this.CfwEnvService.open({ name: 'https://athm.cn/x/azkFH2c' });
    },
    // 跳转详情
    toOrderDetail() {
      Track.pvClick.call(this, XICHE_DINGDAN_CLICK);
      this.CfwEnvService.open({
        name: `${YOUCHE_HOST}/app/mt/car-wash/orderDetails?orderNum=${this.orderNum}&source=${this.source}&pvareaid=${this.pvareaid}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.success-container {
  width: 100%;
  background-color: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.success-icon {
  height: pr2(70);
  width: pr2(70);
  margin-top: pr2(40);
  background-repeat: no-repeat;
}

.success-title {
  font-family: PingFangSC-Bold;
  font-size: pr2(20);
  color: #206cfe;
  letter-spacing: 0;
  margin-top: pr2(20);
  font-weight: bold;
}

.success-btn-container {
  box-sizing: border-box;
  height: pr2(44);
  width: 100%;
  margin-top: pr2(44);
  padding: 0 pr2(50);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.success-back-home {
  height: pr2(44);
  width: pr2(140);
  border-radius: pr2(3);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebf2ff;
  font-family: PingFangSC-Regular;
  font-size: pr2(16);
  color: #206cfe;
  letter-spacing: 0;
  margin-left: pr(15);
}

.success-to-detail {
  height: pr2(44);
  width: pr2(140);
  margin-right: pr(15);
  border-radius: pr2(3);
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(left, #4c88ff, #206cfe);
  font-family: PingFangSC-Regular;
  font-size: pr2(16);
  color: #ffffff;
  letter-spacing: 0;
}
</style>
