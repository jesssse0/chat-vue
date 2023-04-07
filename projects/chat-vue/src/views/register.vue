<template>
  <div class="login-box">
      <div class="logo-box">
          <img class="icon-logo" src="../assets/images/chat4.png"/>
      </div>
      <input v-model="name" class="input-box" type="text" placeholder="请输入用户名"/>
      <input v-model="phone" class="input-box" type="text" placeholder="请输入手机号"/>
      <div class="code-box">
          <input v-model="code" class="input-box code-input" type="password" placeholder="请输入验证码"/>
          <div class="code-btn" @click="getCodeHandle">{{showCounter?counter+'s':'获取验证码'}}</div>
      </div>
      <input v-model="pwd" class="input-box" type="password" placeholder="请输入密码"/>

      <div class="login-btn" @click="registerHandle">注册</div>
  </div>
</template>
<script>
import api from '@/api';
import tools from './utils/tools'

export default {
name: 'Login',
  data() {
      return {
          name: '',
          pwd: '',
          phone: '',
          code:'',
          showCounter:false,
          counter:60,
      }
  },
  methods: {
      registerHandle() {
          if (!this.name) {
              this.$toast('请输入用户名')
          }
          if (!this.phone) {
              this.$toast('请输入手机号')
          }
          if (!this.code) {
              this.$toast('请输入验证码')
          }
          if (!this.pwd) {
              this.$toast('请输入密码')
          }
          api.user.register({
              "name":this.name,
              "password":this.pwd,
              "mobile":`86${this.phone}`,
              "code":this.code  
          }).then(res => {
              if (res.code === 0) {
                  tools.setStore('token', res.data)
                  this.$router.push({path: '/chat'});
              } else {
                  this.$message.error(res.message || '注册失败')
              }
          })
      },
      getCodeHandle() {
          if (this.showCounter) {
              return
          }
          if (!this.phone) {
              this.$message.error('请输入手机号')
              return
          }
          if (this.phone.length !== 11) {
              this.$message.error('请输入正确格式的手机号')
          }
          api.user.sendCode({
              "mobile":`86${this.phone}`
          }).then(res => {
              if (res.code === 0) {
                  this.counterHandle()
                  console.log('验证码发送成功')
              } else {
                  this.$message.error(res.message || '验证码发送失败')
              }
              
          })
          
      },
      counterHandle() {
          this.showCounter = true;
          setInterval(_ => {
              if (this.counter > 0) {
                 this.counter -= 1
              } else {
                  this.counter = 60
                 this.showCounter = false
             }
          },1000)
      },
  }
};
</script>
<style lang="scss" scoped>
.login-box{
  width: 70%;
//  height:200px;
 // background-color: red;
  position: absolute;
  top:150px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;

  .logo-box{
      display: flex;
      justify-content: center;
      margin-bottom: pr(24);
      .icon-logo{
          width: pr(100);
          height: pr(100);
          border-radius: pr(12);
      }
  }

  .code-box{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .code-input{
          margin-right: pr(12);
      }
      .code-btn{
          
          height:pr(64); 
          line-height:pr(64); 
          font-size: 14px;

          color: cadetblue;
          cursor: pointer;

          
      }
  }

  .input-box{
      padding-left: pr(10);
      border:1px solid #e2e2e2;
      border-radius: 3px;
      height:pr(64);
      margin-bottom: pr(24);
      background-color: #fff;
  }

  .login-btn{
      height: pr(64);
      line-height: pr(64);
      border-radius: 3px;
      background-color: #10a37f;
      text-align: center;
      color: #fff;
      margin-bottom: pr(10);
      cursor: pointer;
  }
  .register-tips{
      font-size: 12px;
      color: #10a37f;
  }
  
}
</style>