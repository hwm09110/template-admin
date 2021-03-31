<template>
	<div class="forgetpwd">
		<section class="content flex">
			<div class="left"> </div>
			<div class="right">
				<div class="logo text-align_center">密码重置</div>
				<div class="steps">
					<Steps :current="current">
						<Step title="验证身份" content=""></Step>
						<Step title="重置密码" content=""></Step>
						<Step title="完成" content=""></Step>
					</Steps>
				</div>
				<!-- 验证身份 start -->
				<div class="steps0-box input-box" v-if="current == 0">
					<Form ref="fromSteps0" :model="fromSteps0" :rules="ruleSteps0" :label-width="0">
						<FormItem prop="phone">
							<div class="phone">
								<Input v-model="fromSteps0.phone" prefix="md-tablet-portrait" size="large" placeholder="输入手机号" style="width: 100%" />
							</div>
						</FormItem>
						<FormItem prop="imgCode">
							<div class="img-code_box code">
								<Input v-model="fromSteps0.imgCode" prefix="ios-card-outline" size="large" placeholder="输入图形验证码" style="width: 100%" />
								<img :src="imgPicSrc" @click="handleChangePic" />
							</div>
						</FormItem>
						<FormItem prop="code">
							<div class="code">
								<Input v-model="fromSteps0.code" prefix="ios-card-outline" size="large" placeholder="输入手机验证码" style="width: 70%" />
								<Button class="code-btn" :disabled="fromSteps0.countdown != 60" @click="getCode()" style="width: 102px">{{ fromSteps0.countdown == 60 ? '获取验证码' : fromSteps0.countdown + 's' }}</Button>
							</div>
						</FormItem>
						<div class="steps-btn">
							<Button class="btn" type="primary" style="width: 100%" @click="handleSubmit('fromSteps0')">下一步</Button>
						</div>
					</Form>
				</div>
				<!-- 验证身份 end -->
				<!-- 重置密码 start -->
				<div class="steps1-box input-box" v-if="current == 1">
					<Form ref="fromSteps1" :model="fromSteps1" :rules="ruleSteps1" :label-width="0">
						<FormItem prop="password">
							<div class="password">
								<Input v-model="fromSteps1.password" prefix="md-lock" size="large" placeholder="输入密码" type="password" style="width: 100%" />
							</div>
						</FormItem>
						<FormItem prop="passwordConfirm">
							<div class="password passwordConfirm">
								<Input v-model="fromSteps1.passwordConfirm" prefix="md-lock" size="large" placeholder="确认密码" type="password" style="width: 100%" />
							</div>
						</FormItem>
						<div class="steps-btn">
							<Button class="btn" type="primary" style="width: 100%" @click="handleSubmit('fromSteps1')">下一步</Button>
						</div>
					</Form>
				</div>
				<!-- 充值密码 end -->
				<!-- 完成 start -->
				<div class="steps2-box success-box" v-if="current == 2">
					<p><Icon type="md-checkmark-circle"/></p>
					<h3>设置成功</h3>
					<p>设置密码成功，你可使用新密码进行登录</p>
					<div class="steps-btn">
						<Button class="btn" type="primary" style="width: 100%" @click="handleGoLogin">去登录</Button>
					</div>
				</div>
			</div>

			<!-- 完成 end -->
		</section>
	</div>
</template>
<script>
export default {
	name: 'Forgetpwd',
	data() {
		return {
			current: 0, // 步骤条状态
			fromSteps0: {
				phone: '', // 手机号码
				imgCode: '', // 图形验证码
				code: '', // 手机验证码
				countdown: 60, // 倒计时
				countInterval: null // 倒计时计时器
			},
			fromSteps1: {
				password: '', // 密码
				passwordConfirm: '' // 确认密码
			},
			ruleSteps0: {
				phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
				imgCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
				code: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }]
			},
			ruleSteps1: {
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				passwordConfirm: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
			},
			imgPicSrc: ''
		}
	},
	created() {
		this.handleChangePic()
	},
	methods: {
		//切换图片验证码
		handleChangePic() {
			this.imgPicSrc = this.$http.gettpyzm + `?t=${Date.now()}`
		},
		// 发送短信验证码
		senddxyzm() {},
		handleGoLogin() {
			this.$router.push({ name: 'login' })
		},
		handleSubmit(name, type) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (name == 'fromSteps0') {
						this.yzcode()
					} else if (name == 'fromSteps1') {
						this.resetpwd()
					}
				} else {
				}
			})
		},
		// 重置密码
		resetpwd() {
			if (!this.fromSteps1.password) {
				return this.$Message.warning('输入密码不能为空')
			}
			if (!this.fromSteps1.passwordConfirm) {
				return this.$Message.warning('确认密码不能为空')
			}
			if (this.fromSteps1.password != this.fromSteps1.passwordConfirm) {
				return this.$Message.warning('两次密码输入不一致')
			}
			this.$http
				.resetpwd({
					phone: this.fromSteps0.phone,
					pwd: this.fromSteps1.password,
					pwd_cfm: this.fromSteps1.passwordConfirm
				})
				.then((res) => {
					if (res.code == 200) {
						this.current = 2
					} else {
						this.$Message.error(res.message)
					}
				})
		},
		// 验证短信验证码
		yzcode() {
			if (!this.fromSteps0.phone) {
				return this.$Message.warning('手机号码不能为空')
			}
			if (!this.fromSteps0.code) {
				return this.$Message.warning('手机验证码不能为空')
			}
			this.$http
				.yzcode({
					phone: this.fromSteps0.phone,
					smscode: this.fromSteps0.code
				})
				.then((res) => {
					if (res.code == 200) {
						this.current = 1
					} else {
						this.$Message.error(res.message)
					}
				})
		},
		// 获取手机验证码
		getCode() {
			if (!this.fromSteps0.phone) {
				return this.$Message.warning('手机号码不能为空')
			}
			if (!this.fromSteps0.imgCode) {
				return this.$Message.warning('图像验证码不能为空')
			}
			this.$http
				.senddxyzm({
					phone: this.fromSteps0.phone,
					tpcode: this.fromSteps0.imgCode
				})
				.then((res) => {
					if (res.code == 200) {
						this.$Message.success(res.message)
						--this.fromSteps0.countdown
						this.fromSteps0.countInterval = setInterval(() => {
							--this.fromSteps0.countdown
							if (this.fromSteps0.countdown == 0) {
								this.fromSteps0.countdown = 60
								clearInterval(this.fromSteps0.countInterval)
							}
						}, 1000)
					} else {
						this.$Message.error(res.message)
					}
				})
		}
	}
}
</script>
<style lang="scss" scoped>
.forgetpwd {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #ffffff;
	background-image: url('../../assets/img/passport/bg.png');
	background-size: 100%;
	.content {
		.gologin-btn {
			position: relative;
			left: -20px;
			top: -20px;
		}
		.left {
			width: 500px;
			height: 540px;
			background-image: url('../../assets/img/passport/bg-left.png');
		}
		.right {
			width: 500px;
			height: 540px;
			background-image: url('../../assets/img/passport/bg-right.png');
			padding: 42px 50px 81px;
			position: relative;
			left: -40px;
			text-align: center;
		}
		.logo {
			width: 322px;
			height: 58px;
			background-image: url('../../assets/img/passport/login-title.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			color: #1482ff;
			font-size: 22px;
			line-height: 58px;
			display: inline-block;
			margin-bottom: 26px;
		}

		.steps {
			margin-bottom: 30px;
		}
		.input-box {
			text-align: left;
			.img-code_box {
				position: relative;
				img {
					position: absolute;
					right: 12px;
					top: 50%;
					transform: translateY(-50%);
					width: 110px;
					height: 44px;
				}
			}
			.code {
				display: flex;
				.code-btn {
					margin-left: 20px;
				}
			}
		}
		.steps-btn {
			.btn {
				border-radius: 37px;
				font-size: 18px;
				height: 50px;
			}
		}
		.success-box {
			text-align: center;
			> p {
				margin-bottom: 30px;
				i {
					font-size: 80px;
					color: #52c41a;
				}
			}
			> h3 {
				margin-bottom: 16px;
				font-size: 18px;
			}
		}
	}
}
</style>
<style lang="scss">
.forgetpwd {
	input {
		height: 50px;
		border-radius: 25px;
		font-size: 16px;
	}
	.ivu-input-prefix .ivu-icon {
		line-height: 50px !important;
		color: #1482ff;
	}

	// .ivu-steps-horizontal {
	//   display: flex;
	//   justify-content: center;
	//   .ivu-steps-content{
	//     padding-left:0px;
	//     padding-top: 6px;
	//     margin-left: -10px;
	//   }
	//   .ivu-steps-item:last-child{
	//     width: auto !important;
	//     .ivu-steps-content{
	//       margin-left: 0px;
	//     }
	//   }
	//   .ivu-steps-head-inner{
	//     margin-right: 0px;
	//   }
	//   .ivu-steps-status-process{
	//     width: 21% !important
	//   }
	//   .ivu-steps-status-finish{
	//     width: 21% !important
	//   }
	// }
}
</style>
