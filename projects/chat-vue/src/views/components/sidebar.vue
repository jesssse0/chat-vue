<template>
  <div class='sidebar'>
    <div class="top">
      <el-srcollbar>
        <el-card class="recordItem" v-for="item in recordList" :key="item.id" @click="changeRecord(item)">
          {{ item.quest }}
          <div class="time">{{ item.actionTime.split('T')[0] }}</div>
        </el-card>
      </el-srcollbar>
    </div>
    <div class="bottom" v-if="userToken.token === ''">
      <el-button @click="login">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router';
import { reactive } from 'vue'
import { user } from '../../store'
import api from '../../api'
import tools from '../utils/tools';

// 登录操作
function login() {
  router.push('/login')
}

interface recordList {
        id: number,
        userid: number,
        quest: string,
        reply: string,
        type: string,
        createTime: string,
        actionTime: string
    }
let recordList:Array<recordList> = reactive([])

const userToken = user()
console.log('token是什么', userToken.token, tools.getStore('token'))
if(userToken.token !== '') {
  getRecordList()
} else {
  if(tools.getStore('token')) {
    const token = tools.getStore('token')
    if(token !== null) {
      userToken.setToken(token)
    }
    getRecordList()
  }
}
async function getRecordList() {
  const params = {
    token: tools.getStore('token'),
    pageNo: 1,
    pageSize: 10
  }
  const res = await api.user.getUserRecordList(params)
  console.log('有多少列表', res)
  recordList.push(...res.data.list)
  recordList.push({
    id: 0,
    userid: 0,
    quest: "当前会话",
    reply: '',
    type: 'question',
    createTime: "",
    actionTime: ""
  })
}

// 更改会话窗口
function changeRecord(item:recordList) {
  console.log('点击的是哪个窗口', item.id)
  userToken.setMessageList(item.id)
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
.recordItem {
  cursor: pointer;
  text-align: left;
  .time {
    font-size: 12px;
    color: #909090;
  }
}
</style>
