<template>
  <div class="index-container Base">
    <Layout></Layout>
  </div>
</template>

<script>

import echarts from "echarts";

import Layout from '@c/layout/Layout'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Layout
  },
  name: "Base",
  data () {
    return {

    };
  },
  created() {


  },

  computed: {
    
  },
  
  mounted () {
    this.$store.dispatch('getUploadTokenUrl') //定时更新上传文件所需的token
  },
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>
.index-container{
  height: 100%;
}
</style>

<style>

</style>