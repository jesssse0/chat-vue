<template>
    <div class="login-box">
        <input v-model="name" class="input-box" type="text" placeholder="请输入账号"/>
        <input v-model="pwd" class="input-box" type="password" placeholder="请输入密码"/>
        <div class="login-btn" @click="loginHandle">登录</div>
        <div class='register-tips' @click="toRegister">没有账号?去注册</div>
    </div>
</template>
<script>
import { login } from '../../apis/chatgpt.api';

export default {
  name: 'Login',
    data() {
        return {
            name: '',
            pwd:''
        }
    },
    methods: {
        loginHandle() {
            login({
                "password":"asdd",
                "mobile":"8617611159321"

            }).then(res => {
                console.log(res,'dengl')
            })
            console.log(this.name,this.pwd,'数据')
        },
        toRegister() {
            console.log('去注册')
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
        background-color: cadetblue;
        text-align: center;
        color: #fff;
        margin-bottom: pr(10);
    }
    .register-tips{
        font-size: 12px;
        color: darkcyan;
    }
    
}
</style>