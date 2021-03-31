<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import { isHttpsUrl } from './utils/utils'
export default {
	created() {
		//维持session有效
		this.$store.dispatch('setKeepAlive')
		const isHttps = process.env.VUE_APP_OPEN_HTTPS
		if (!isHttpsUrl() && isHttps === '1') {
			window.location.href = window.location.href.replace('http', 'https')
		}
	}
}
</script>
<style lang="scss">
html,
body {
	width: 100%;
	height: 100%;
	background-color: #f3f5f8;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 100%;
	height: 100%;
	min-height: 100%;
	min-width: 1100px;
}
</style>
