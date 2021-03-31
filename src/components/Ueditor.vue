<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
import { getUediorConfig } from "@/common/ueditorConfig";
import { setTimeout } from "timers";
export default {
  name: "Ueditor",
  data() {
    return {
      editor: null
    };
  },
  props: {
    value: "",
    config: {}
  },
  watch: {
    value: function(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.editor.setContent(newValue);
        }, 200);
      }
    }
  },
  mounted() {
    let defaultConfig = getUediorConfig();
    let configs = Object.assign(defaultConfig, this.config);
    this.editor = window.UE.getEditor("editor", configs);
    this.editor.addListener("ready", () => {
      this.editor.setContent(this.value);
    });
  },
  methods: {
    getUEContent() {
      return this.editor.getContent();
    },
    setUEContent(val) {
      return this.editor.setContent(val);
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
