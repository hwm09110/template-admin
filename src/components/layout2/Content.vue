<template>
	<Content
		:style="{
			marginLeft: '15px',
			marginTop: '15px',
			background: '#fff',
			minHeight: '260px'
		}"
		class="content"
	>
		<section class="index-box" v-if="$route.path == '/index'">
			<div>
				<h1>欢迎登录</h1>
				<h1>{{ systemName }}</h1>
			</div>
		</section>
		<router-view />
	</Content>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: {
		...mapState(['systemName'])
	}
}
</script>

<style lang="scss" scoped>
.content {
	min-height: auto !important;
	.index-box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		> div {
			h1 {
				text-align: center;
				font-size: 30px;
				margin-bottom: 10px;
			}
		}
	}
}
</style>
