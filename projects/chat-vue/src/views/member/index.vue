<template>
    <div>
        <!-- 用户信息 -->
        <div>
            <div></div>
        </div>
        <!-- 会员权益 -->
        <div>

        </div>
        <!-- 会员价格 -->
        <div class="member-list" >
            
        </div>
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
            login({name:'admin'})
            console.log(this.name,this.pwd,'数据')
        },
        toRegister() {
            console.log('去注册')
        }
    }
};
</script>
<style lang="scss" scoped>
.member-list{
    display: flex;
    flex-direction: row;
}
</style>