<template>
	<div class="login">
		<section class="content flex" v-if="!singlePoint">
			<div class="left"></div>
			<div class="right">
				<div class="logo text-align_center"> {{ systemName }}-后台管理系统 </div>
				<Form ref="formInfo" :model="formInfo" :rules="ruleInfo" :label-width="0">
					<FormItem prop="username">
						<div class="username">
							<Input v-model="formInfo.username" prefix="ios-contact" size="large" placeholder="输入账号" style="width: 100%" />
						</div>
					</FormItem>
					<FormItem prop="password">
						<div class="password">
							<Input v-model="formInfo.password" prefix="md-lock" type="password" size="large" placeholder="输入密码" style="width: 100%" />
						</div>
					</FormItem>
					<FormItem prop="imgCode">
						<div class="imgCode">
							<Input v-model="formInfo.imgCode" prefix="md-lock" type="text" size="large" placeholder="输入验证码" style="width: 100%" />
							<img :src="imgCodeSrc" alt="img" class="img-code" @click="hanldeRefreshCode" />
						</div>
					</FormItem>
				</Form>
				<div class="other">
					<Checkbox v-model="learnStatus">自动登录</Checkbox>
					<router-link to="/passport/forgetpwd" tag="a" class="color-blue cursor-pointer">忘记密码</router-link>
				</div>
				<div class="btn-box">
					<Button class="btn" type="primary" style="width: 100%" @click="handleSubmit('formInfo')">登录</Button>
				</div>

				<div class="pact" style="margin-top:10px;">
					<Checkbox v-model="readStatus"></Checkbox>登录即表示阅读并同意 <a class="color-blue cursor-pointer" href="//www.baokaodaxue.com/ydzt/web_school/teacheragreement" target="_blank">《用户协议》</a>和
					<a class="color-blue cursor-pointer" href="//www.baokaodaxue.com/ydzt/web_school/userpersonalagreement" target="_blank">《隐私保护政策》</a>
				</div>
			</div>
		</section>
		<section v-if="singlePoint">
			<Spin size="large" fix></Spin>
		</section>
	</div>
</template>
<script>
// import VerifyModal from '@c/VerifyModal';
import { mapState } from 'vuex'
import { encrypt, decrypt } from '@/utils/encry'
import { isPhone, getDeviceFinger } from '@/utils/utils'
import Cookies from 'js-cookie'
export default {
	name: 'login',
	data() {
		return {
			singlePoint: false, // 是否单点登录
			code: '', // 单点登录code
			formInfo: {
				username: '',
				password: '',
				imgCode: ''
			},
			ruleInfo: {
				username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				imgCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
			},
			imgCodeSrc: '', //图片验证码
			learnStatus: false, // 自动登录
			readStatus: false // 协议
		}
	},
	computed: {
		...mapState(['systemName'])
	},
	methods: {
		handleSubmit(name) {
			localStorage.setItem('isLogin', 1)
			this.$router.push({ name: 'index' })
			return false
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (!this.readStatus) {
						this.$Message.warning('请先勾选同意用户条款!')
						return
					}
					this.doLogin()
				} else {
				}
			})
		},

		// 登录接口
		async doLogin() {
			let params = {
				account: this.formInfo.username,
				pwd: this.formInfo.password,
				pic_code: this.formInfo.imgCode
			}
			let res = await this.$http.doLogin(params)
			if (res.code === '200') {
				let info = res.extraData
				this.$Message.success(res.message)
				localStorage.setItem('isLogin', 1) //保存登录态
				this.$store.commit('SET_USERINFO', res.extraData)
				this.storeUserInfo(res.extraData)
				if (this.learnStatus) {
					this.setAutoLogin()
				}
				this.$router.push({ name: 'index' })
			} else {
				this.$Message.error(res.message)
			}
		},

		//设置自动登录
		setAutoLogin() {
			let encrypt_user = encrypt(this.formInfo.username)
			let encrypt_pwd = encrypt(this.formInfo.password)

			Cookies.set('u', encrypt_user, { expires: 7 })
			Cookies.set('p', encrypt_pwd, { expires: 7 })
		},

		//回填自动登录的信息
		fillLoginInfo() {
			let user = Cookies.get('u')
			let password = Cookies.get('p')
			if (user && password) {
				this.formInfo.username = decrypt(user)
				this.formInfo.password = decrypt(password)
			}
		},

		// 保存登录接口返回的信息到 localStorage
		storeUserInfo(info) {
			localStorage.setItem('userInfo', JSON.stringify(info))
		},

		// 获取url参数
		getUrlParam(param) {
			var regExp = new RegExp('([?]|&)' + param + '=([^&]*)(&|$)')
			var result = window.location.href.match(regExp)
			if (result) {
				return decodeURIComponent(result[2])
			} else {
				return null
			}
		},

		// 刷新验证码
		hanldeRefreshCode() {
			this.imgCodeSrc = `${this.$http.getImgCodeSrc()}?t=${new Date().getTime()}`
		}
	},

	async created() {
		this.device_finger_str = await getDeviceFinger()
		const isLogin = localStorage.getItem('isLogin')
		if (isLogin) {
			this.$router.push({ name: 'index' })
		}
		this.fillLoginInfo()
		// this.imgCodeSrc = this.$http.getImgCodeSrc()
	}
}
</script>
<style lang="scss" scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #ffffff;
	background-image: url('../../assets/img/passport/bg.png');
	background-size: 100%;
	.color-blue {
		color: #01a6f2;
	}
	.cursor-pointer {
		cursor: pointer;
	}

	.content {
		.left {
			width: 500px;
			height: 540px;
			background-image: url('../../assets/img/passport/bg-left.png');
		}
		.right {
			width: 500px;
			height: 540px;
			background-image: url('../../assets/img/passport/bg-right.png');
			padding: 52px 50px 81px;
			position: relative;
			left: -40px;
			text-align: center;
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
				margin-bottom: 46px;
			}
			.username {
				// margin-bottom: 16px;
			}
			.other {
				margin-bottom: 24px;
				margin-left: 10px;
				margin-right: 10px;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
			}
			.btn-box {
				.btn {
					border-radius: 37px;
					font-size: 18px;
					height: 50px;
				}
			}
			.pact {
				font-size: 12px;
			}
			.imgCode {
				position: relative;
				.img-code {
					position: absolute;
					right: 4px;
					top: 5px;
					width: 100px;
					height: 34px;
				}
			}
		}
	}
}
</style>
<style lang="scss">
.login {
	.username,
	.password,
	.imgCode {
		input {
			height: 46px;
			border-radius: 25px;
			font-size: 16px;
		}
		.ivu-icon {
			line-height: 46px;
			color: #1482ff;
			font-size: 18px;
		}
	}
	.ivu-checkbox-wrapper {
		font-size: 16px;
	}
	.ivu-form-item {
		margin-bottom: 20px;
	}
}
</style>
