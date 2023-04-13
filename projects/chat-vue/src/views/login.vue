<template>
    <div class="login-box">
        <div class="logo-box">
            <img class="icon-logo" src="../assets/images/chat4.png"/>
        </div>
        <input v-model="phone" class="input-box" type="text" placeholder="请输入账号"/>
        <input v-model="pwd" class="input-box" type="password" placeholder="请输入密码"/>
        <div class="login-btn" @click="loginHandle">登录</div>
        <div class='register-tips' @click="toRegister">没有账号?去注册</div>
    </div>
</template>
<script>
import api from '@/api';
import tools from './utils/tools'
import { mapActions } from 'pinia'
import { user } from '../store'

export default {
  name: 'Login',
    data() {
        return {
            phone: '',
            pwd:''
        }
    },
    methods: {
        ...mapActions(user, ['setToken']),
        loginHandle() {
            if (!this.phone || this.phone.length !== 11) {
                this.$message.error('请输入正确格式的手机号')
                return
            }
            if (!this.pwd) {
                this.$message.error('请输入密码')
                return
            }
            api.user.login({
                "mobile":`86${this.phone}`,
                "password":this.pwd,
            }).then(res => {
                if (res.code === 0) {
                    tools.setStore('token', res.data)
                    this.setToken(res.data)
                    this.$router.push({path: '/chat'});
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        toRegister() {
            this.$router.push({path: '/register'});
        }
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

    .input-box{
        padding-left: pr(10);
        border:1px solid #e2e2e2;
        border-radius: 3px;
        height:pr(88);
        margin-bottom: pr(24);
        background-color: #fff;
    }

    .login-btn{
        height: pr(88);
        line-height: pr(88);
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
        cursor: pointer;
    }
    
}
</style>