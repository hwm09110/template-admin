<template>
  <div :class="{'upload-btn-wrap': true, inlineBlock}" @click="handleClick">
    <input type="file" class="uploadInput" @change="handleInputChange" :multiple="multiple">
    <slot name="addBtn">
      <FormItem>
        <Button icon="ios-cloud-upload-outline"></Button>
      </FormItem>
    </slot>
  </div>
</template>

<script>
export default {
  name: "UploadBtn",
  props: {
    text: {
      type: String,
      default: "上传文件"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    inlineBlock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      document.querySelector('.upload-btn-wrap > .uploadInput').click()
    },
    handleInputChange(ev) {
      const fileList = ev.target.files;
      this.$emit('on-success', ev);
      document.querySelector('.upload-btn-wrap > .uploadInput').value = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-btn-wrap {
  padding: 10px 15px;
  border-radius: 6px;
  white-space: nowrap;
  cursor: pointer;
  .uploadInput {
    display: none;
  }
  .btn {
    color: #fff;
    font-size: 18px;
  }
  &.inlineBlock {
    display: inline-block;
    padding: 0;
  }
}
</style>


