<template>
  <section class="rules-wrapper">
    <div class="header">活动规则</div>
    <div class="content">
      <ul>
        <li v-for="(rule, index) in ruleList" :key="index">
          <p>{{rule}}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Rule',
  props: {
    ruleList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$imgPath: '~@assets/images/redcoupon/';
.rules-wrapper {
  margin-bottom: pr(32);
  background: #fff;
  border-radius: pr(12);
  overflow: hidden;
  .header {
    height: pr(120);
    font-size: pr(40);
    color: #930800;
    font-weight: bold;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url($imgPath + 'title-bg.png') center center no-repeat;
    background-size: pr(448) pr(28);
  }

  .content {
    width: 100%;
    flex: 1;
    padding: 0 pr(32) pr(40);
    box-sizing: border-box;
    overflow: auto;
    ul {
      li {
        margin-bottom: pr(20);
        &:last-child {
          margin-bottom: 0;
        }
        p {
          margin: 0;
          font-family: PingFangSC-Regular;
          font-size: pr(26);
          color: #464E64;
          line-height: pr(34);
          text-align: justify;
        }
      }
    }
  }
}
</style>
