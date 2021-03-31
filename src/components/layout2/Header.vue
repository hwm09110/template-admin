<template>
	<div class="header">
		<div class="header-main">
			<div class="left">
				<img class="logo" :src="logoImg" alt="" />
				<span class="sysName">{{ sysName }}</span>
			</div>
			<div class="right">
				<h2 class="logout-btn" @click="doLayout">退出</h2>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			logoImg: require('../../assets/img/logo.png'),
			sysName: '宏途云笔记'
		}
	},
	methods: {
		doLayout() {
			this.$store.dispatch('clearAllState')
			localStorage.removeItem('userInfo')
			localStorage.removeItem('isLogin')
			this.$router.replace({ name: 'login' })
		}
	}
}
</script>
<style lang="scss" scoped>
.header {
	width: 100%;
	min-width: 1200px;
	height: 70px;
	background-color: #354052;
	.header-main {
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			display: flex;
			align-items: center;
			height: 100%;
			.logo {
				width: 40px;
				height: 40px;
			}
			.sysName {
				font-size: 18px;
				font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
				font-weight: bold;
				color: #ffffff;
				margin-left: 10px;
			}
		}
		.right {
			.logout-btn {
				font-size: 14px;
				color: #fff;
				cursor: pointer;
			}
		}
	}
}
</style>
