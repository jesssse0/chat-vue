<template>
    <div class="chat-box">
        <div class="chat-dialog">
            <div v-for="(item,idx) in list" :key="idx">
                <div v-if="item.type === 'answer'" class="dialog-answer">
                    <img class="icon-ai" src="../assets/images/icon-ai.jpeg"/>
                    <div class="dialog-box">{{item.text}}</div>
                </div>
                <div v-else class="dialog-question">
                    <div class="dialog-box">{{item.text}}</div>
                    <img class="icon-user" src="../assets/images/icon-ai.jpeg"/>

                </div>

            </div>
        </div>
        <div class="chat-input-box" >
            <div class="chat-input"> <input type="text" v-model="qText" /></div>
            <div class="send-btn" @click="sendHandel">发送</div>
        </div>
    </div>
</template>
<script>
import { getAnswer } from '../apis/chatgpt.api';

export default {
    name: 'Chat',
    data() {
        return {
            qText:'',
            list: [
                    {type:'answer',text:'请说出您的问题'},
                    {type:'question',text:'sss'}
                ]
            }
    },
    methods: {
        sendHandel() {
            console.log(this.qText, 'ss')
            if (!this.qText) {
                return false
            }
            const {qText} = this
            const {list} = this
            list.push({
                type: 'question',
                text:qText
            })
            this.list = list
            console.log(this.list, 'list')
            getAnswer({
                "mobile":"8617611159321",
                "quest":"最美的十位女明星是谁？"
            }).then(res => {
                // if (res.code === 0) {
                    
                // }
                console.log(res, 'res')
                list.push({
                    type: 'answer',
        text:"\n\n林心如、迪丽热巴、郭碧婷、高圆圆、刘诗诗、赵丽颖、柳岩、杨幂、古力娜扎、唐嫣。"
                })
    this.list = list
})
            return true
        },
    }
        
}

</script>
<style lang="scss" scoped>
.chat-box{
    min-height: 100vh;
    background-color: #f2f2f2;

.chat-dialog{
    width:100%;
    box-sizing: border-box;
    padding: pr(24) pr(24) pr(90);
}
    .dialog-answer{
        display: flex;
        flex-direction: row;
        margin-bottom: pr(24);
        .icon-ai{
            width: pr(64);
            height: pr(64);
            margin-right: pr(12);
        }
        
        .dialog-box{
            padding:pr(12);
            width: 60%;
            background-color: #fff;
            border-radius: pr(8);
        }
        
    }
    .dialog-question{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: pr(24);
        .icon-user{
            width: pr(64);
            height: pr(64);
            margin-left: pr(12);
        }
        .dialog-box{
            width: 60%;
            padding:pr(12);
            background-color: #51aa51;
            border-radius: pr(8);
            padding:pr(12);
        }

    }

    .chat-input-box{
        position: fixed;
        bottom: 0;
        border-top:1px soild #e2e2e2;
        background-color: #f8f8f8;
        height: pr(88);
        width:100%;
        box-sizing: border-box;
        padding:pr(12) pr(24);
        display: flex;
        flex-direction: row;
        .chat-input{
            flex: 1;
            margin-right: pr(24);
            display: flex;
            input{
                flex: 1;
                border:1px soild #e2e2e2;
            }
        }
        .send-btn{
            height: pr(64);
            line-height: pr(64);
            background-color: #51aa51;
            border-radius: pr(8);
            padding:0 pr(12);

        }
    }
}
</style>