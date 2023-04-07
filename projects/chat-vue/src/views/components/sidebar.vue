<template>
  <div class='sidebar'>
    <div class="top">
      <el-card>当前会话</el-card>
    </div>
    <div class="bottom">
      <el-button @click="login">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router';

// 登录操作
function login() {
  router.push('/login')
}
</script>

<style scoped lang='scss'>
.sidebar {
  position: relative;
}
.top {
  text-align: center;
}
.bottom  {
  position: absolute;
  bottom: 20px;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  .el-button {
    width: 90%;
    background: #10a37f;
    color: #fff;
  }
}
</style>
