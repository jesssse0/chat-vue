import { defineStore } from 'pinia'
import api from '../api'
import tools from '../views/utils/tools'

// 用户信息保存store
export const user = defineStore('userInfo', {
  state: () => {
    return {
      token: '',
      messageList: []
    }
  },
  actions: {
    // 这里要改成对应接口的类型
    setToken(token:string) {
      this.token = token
    },
    async setMessageList(id:number) {
      const res = await api.user.getRecordDetail({
        token: tools.getStore('token'),
        id: id
      })
      console.log('聊天详情', res)
      this.messageList = JSON.parse(res.data.reply)
      console.log('消息列表', this.messageList)
    }
  }
})