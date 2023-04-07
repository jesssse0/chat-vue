<template>
  <div class='indexContainer'>
    <Sidebar class="sidebar"></Sidebar>
    <div class="rightContent">
      <router-view></router-view>
      <Footer class="footer"></Footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/sidebar.vue'
import Footer from './components/footer.vue'

</script>

<style scoped lang='scss'>
.sidebar {
  width: 20%;
  border: 1px solid #ccc;
  margin-right: 10px;
}
.indexContainer {
  display: flex;
  width: 100%;
  height: 100vh;
}
.rightContent {
  width: calc(80% - 12px);
  display: flex;
  flex-direction: column;
}
.footer {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: pr(20);
  color: #a19f9f;
}
</style>
