<template>
	<div class="layout">
		<Layout>
			<div class="left-box">
				<div class="logo">{{ systemName }}</div>
				<Sider class="left-nav" ref="side1" hide-trigger :collapsible="false" :collapsed-width="100" v-model="isCollapsed" width="200px">
					<Menu :active-name="leftNavActive" theme="dark" width="200px" :open-names="leftNavOpen" :class="menuitemClasses" ref="child">
						<div v-for="item in leftNavList" :key="item.name">
							<MenuItem :name="item.name" v-if="!item.secondNav" :to="{ name: item.name }">
								<Icon :type="item.icon"></Icon>
								<span style="width:100px">{{ item.text }}</span>
							</MenuItem>
							<Submenu :name="item.name" v-if="item.secondNav">
								<template slot="title">
									<Icon :type="item.icon" />
									{{ item.text }}
								</template>
								<MenuItem :name="subItem.name" v-for="subItem in item.secondNav" :key="subItem.text" :to="{ name: subItem.name }">{{ subItem.text }}</MenuItem>
							</Submenu>
						</div>
					</Menu>
				</Sider>
			</div>
			<Layout>
				<Header @collapsedSider="handleCollapsedSider"></Header>
				<Content></Content>
			</Layout>
		</Layout>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './Header'
import Content from './Content'
export default {
	components: {
		Header,
		Content
	},
	data() {
		return {
			isCollapsed: false
		}
	},
	computed: {
		...mapState(['leftNavList', 'leftNavOpen', 'leftNavActive', 'userInfo', 'systemName']),
		rotateIcon() {
			return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
		},
		menuitemClasses() {
			return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
		}
	},
	created() {},
	methods: {
		handleCollapsedSider() {
			this.$refs.side1.toggleCollapse()
		}
	}
}
</script>

<style lang="scss" scoped>
.layout {
	border: 1px solid #d7dde4;
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
	height: 100%;
	.left-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		.logo {
			width: 100%;
			height: 64px;
			color: #fff;
			text-align: center;
			line-height: 64px;
			font-size: 20px;
			font-weight: bold;
			background-color: #00284d;
		}
		.left-nav {
			flex: auto;
			overflow: auto;
			&::-webkit-scrollbar {
				display: none;
			}
			scrollbar-width: none;
			-ms-overflow-style: none;
		}
	}
	.index-box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		> div {
			h1 {
				text-align: center;
				font-size: 40px;
				margin-bottom: 10px;
			}
		}
	}
	.layout-logo-left {
		width: 90%;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		margin: 15px auto;
	}
	.menu-icon {
		transition: all 0.3s;
	}
	.rotate-icon {
		transform: rotate(-90deg);
	}
	.menu-item span {
		display: inline-block;
		overflow: hidden;
		width: 69px;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: bottom;
		transition: width 0.2s ease 0.2s;
	}
	.menu-item i {
		transform: translateX(0px);
		transition: font-size 0.2s ease, transform 0.2s ease;
		vertical-align: middle;
		font-size: 16px;
	}
	.collapsed-menu span {
		width: 0px;
		transition: width 0.2s ease;
	}
	.collapsed-menu i {
		transform: translateX(5px);
		transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
		vertical-align: middle;
		font-size: 22px;
	}
	/deep/ .ivu-layout-sider {
		background-color: #00284d;
	}
	/deep/ .ivu-layout-has-sider {
		height: 100%;
	}
}
</style>

<style>
.layout .left-nav .ivu-menu-submenu-title > i {
	margin-right: 2px;
}
.layout .top-nav .ivu-dropdown-rel {
	display: flex;
}
</style>
