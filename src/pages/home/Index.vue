<template>
	<div class="index-container home">
		<component :is="layoutMode == 1 ? 'Layout' : 'Layout2'"></component>
	</div>
</template>

<script>
import Layout from '@c/layout/Layout'
import Layout2 from '@c/layout2/Layout'
import { mapState } from 'vuex'
export default {
	components: {
		Layout,
		Layout2
	},
	name: 'Index',
	computed: {
		...mapState(['layoutMode'])
	}
}
</script>

<style lang="scss" scoped>
.index-container {
	height: 100%;
}
</style>
