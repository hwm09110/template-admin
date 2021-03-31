<template>
  <div class="cropper">
    <vueCropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :autoCrop="true"
      :fixed="true"
    ></vueCropper>
  </div>
</template>

<script>
export default {
  name: "UploadBtn",
  props: ['option'],
  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.cropper{
  width: 260px;
  height: 260px;
  margin:0 auto;
}
</style>


