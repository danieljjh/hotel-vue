<template>
<!-- le-markdown  -->
<div id="app">
  <div id="editor-main">
    <h1>This is an about page</h1>
        <le-editor v-model="value" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="save"></le-editor>
  </div>
</div>

</template>
<script>
// import pmd from "le-markdown-editor"
// const store = this.$stores
export default {
  name: "Editor",
  components: {

  },
 data() {
      return {
        hljsCss: "github",
        value: "这里放markdown内容",
        // 自定义
        imageUploader: {
          custom: false,
          fileType: "file",
          fileNameType: "",
          imagePrefix: "http://47.100.125.98", // 图片上传成功后，预览地址前缀
          type: "server",
          url: "http://47.100.125.98:82/upload" // 上传接口地址
        }
      }
    },
    methods: {
      // 自定义图片上传
      // uploadImg: function ($vm, file, fileName) {
      //   console.log($vm)
      //   console.log(file)
      //   console.log(fileName)
      //   // // 添加图片
      //   // // 两个参数 第一个是图片访问路径 第二个是文件名
      //   // $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${fileName}`, fileName)
      // },
      save: function (val) {
        // 获取预览文本
        console.log(this.value) // 这里是原markdown文本
        console.log(val) // 这个是解析出的html
      }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
  #app {
    width: 1200px;
    height: 500px;
    margin: 50px auto;
  }

  #editor-main {
    color: #2c3e50;
    width: 80%;
    height: 100%;
  }
  .le-editor-container{

  }
    .CodeMirror{
    text-align: left;
  }
</style>
