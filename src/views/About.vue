<template>
  <div id="editor-main">
    <h1>This is an about page</h1>
    <le-editor v-model="value" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="save"></le-editor>

  </div>
</template>
<script>
// import pmd from 'le-markdown-editor'
// const store = this.$stores
export default {
  name: 'Editor',
  components: {
  },
  data () {
    return {
      hljsCss: 'agate',
      value: '这里放markdown内容',
      // 自定义
      imageUploader: {
        custom: false,
        fileType: 'file',
        fileNameType: '',
        imagePrefix: 'http://47.100.125.98', // 图片上传成功后，预览地址前缀
        type: 'server',
        url: 'http://47.100.125.98:82/upload' // 上传接口地址
      }
    }
  },
  methods: {
    save: function (val) {
    // 获取预览文本
      console.log(this.value) // 这里是原markdown文本
      console.log(val) // 这个是解析出的html
    }
  }
}
</script>
<style lang="scss">
  #app {
    width: 90%;
    height: 600px;
    margin: 50px auto;
  }

  #editor-main {
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }
</style>
