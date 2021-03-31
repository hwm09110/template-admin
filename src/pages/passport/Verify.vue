<template>
  <div class="verify">
    <section class="content">
      <div class="logo text-align_center"><img src="../../assets/img/logo.png" alt="logo"></div>
      <h2>手机号验证</h2>

      <div class="steps0-box input-box" >
        <Form ref="fromVerify" :model="fromVerify" :rules="ruleVerify" :label-width="0">
          <FormItem prop="phone">
            <div class="phone">
              <Input v-model="fromVerify.phone" prefix="md-tablet-portrait" size="large" placeholder="输入手机号"  style="width: 100%"  />
            </div>
          </FormItem>
          <FormItem prop="imgCode">
            <div class="img-code_box code">
              <Input v-model="fromVerify.imgCode" prefix="ios-card-outline"  size="large" placeholder="输入图形验证码" style="width: 100%" />
              <img  src="http://www.baokaodaxue.com/passport/captcha/createcode?random=1564468268743" >
            </div> 
          </FormItem>
          <FormItem prop="code">
            <div class="img-code code">
              <Input v-model="fromVerify.code" prefix="ios-card-outline"  size="large" placeholder="输入手机验证码" style="width: 70%" />
              <Button class="code-btn" :disabled="countdown != 60" @click="getCode()" style="width: 102px" >{{countdown == 60 ? '获取验证码' : countdown + 's'}}</Button>
            </div>
          </FormItem>
          <div class="steps-btn">
            <Button  type="primary" style="width: 100%" @click="handleSubmit('fromVerify')">提交</Button>
          </div>
        </Form>
      </div>
    </section>

  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
  export default {
    name: "verify",
    data () {
        return {
          fromVerify:{
            phone:'',           // 手机号码
            imgCode:'',         // 图形验证码
            code:'',            // 手机验证码
          },
          ruleVerify:{
            phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' }
            ],
            imgCode: [
                { required: true, message: '请输入图形验证码', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入手机验证码', trigger: 'blur' }
            ],
          },
          countdown:60,         // 倒计时
          countInterval:null    // 倒计时计时器
        }
    },
    methods:{
      handleSubmit(name,type){
        this.$refs[name].validate((valid) => {
          if (valid) {
              this.$Message.success('Success!');
          } else {
      
          }
        })
      },
      getCode(){
        --this.countdown;
        this.countInterval = setInterval(() => {
          --this.countdown;
          if(this.countdown == 0){
            this.countdown = 60;
            clearInterval(this.countInterval);
          }
        },1000)
      } 
    }
  }
</script>
<style lang="scss" scoped>

.verify{
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  .content{
    width: 410px;
    > h2{
      font-size: 18px;
      text-align: center;
      margin-bottom: 50px;
    }
    .steps{
      margin-bottom: 50px;
    }
    .input-box{
      .img-code_box{
        position: relative;
        img{
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 110px;
          height: 24px;
        }
      }
      .code{
        .code-btn{
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
<style  lang="scss">
.forgetpwd{
  .ivu-steps-horizontal {
    display: flex;
    justify-content: center;    
    .ivu-steps-content{
      padding-left:0px;
      padding-top: 6px;
      margin-left: -10px;
    }
    .ivu-steps-item:last-child{
      width: auto !important;
      .ivu-steps-content{
        margin-left: 0px;
      }
    }
  }
}  
</style>