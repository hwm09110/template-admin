<template>
	<Header :style="{ padding: 0 }" class="layout-header-bar header">
		<div class="top-nav flex justify-space_between align-items" style="height: 100%;">
			<!-- <Icon :style="{ margin: '0 20px' }" type="md-menu" size="24" @click.native="handleCollapsedSider"></Icon> -->
			<div></div>
			<div class="flex align-items" style="height: 100%;">
				<span class="sch-name">{{ currentInfo.sch_name }}</span>
				<span class="name">{{ currentInfo.teacher_name }}</span>
				<Dropdown @on-click="doLayout">
					<img class="avatar" :src="currentInfo.portrait" />
					<DropdownMenu slot="list" @click="doLayout">
						<DropdownItem>退出</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	</Header>
</template>
<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			defaultImg: require('../../assets/img/avatar.png'),
			oaData: {}
		}
	},
	computed: {
		...mapState(['userInfo']),
		currentInfo() {
			let vuexInfo = this.userInfo ? this.userInfo : ''
			let localInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
			let info = vuexInfo ? vuexInfo : localInfo
			return info
		}
	},
	methods: {
		handleCollapsedSider() {
			this.$emit('collapsedSider')
		},
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
.header.layout-header-bar {
	background: #fff;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	.sch-name {
		display: inline-block;
		margin-right: 15px;
	}
	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 100% 100%;
		border: 1px solid #eeeeee;
		margin: 0 48px 0 12px;
	}
}
</style>
