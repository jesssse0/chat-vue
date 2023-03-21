<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script lang="ts">
// import { Vue } from 'vue-property-decorator';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
@import './assets/style/core/reset';
body {
  margin: 0;
}
body.modal-open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
