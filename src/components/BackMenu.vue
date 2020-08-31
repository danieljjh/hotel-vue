<template>
    <el-menu class="el-menu-demo" mode="horizontal" router>
  <el-menu-item index="1" route="/">处理中心</el-menu-item>
  <el-submenu index="0">
        <template slot="title">平台工作台</template>
    <el-menu-item index="0-3" route="/home">首页</el-menu-item>
    <el-menu-item index="0-2" route="/hotel/orders">订单</el-menu-item>
    <el-menu-item index="0-4" route="/hotel/packages">套餐产品</el-menu-item>
  </el-submenu>

  <el-submenu index="2">
    <template slot="title">酒店工作台</template>
    <el-menu-item index="2-3" route="/hotel/partner">商家信息</el-menu-item>
    <el-menu-item index="2-1" route="/hotel/home">酒店信息</el-menu-item>
    <el-menu-item index="2-2" route="/hotel/orders">订单</el-menu-item>
    <el-menu-item index="2-4" route="/hotel/packages">套餐产品</el-menu-item>
    <!-- <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu> -->
  </el-submenu>
  <el-menu-item index="3" >消息中心</el-menu-item>
  <el-menu-item index="4" route="/hotel/orders">订单管理</el-menu-item>
</el-menu>
</template>
<script>
export default {
  name: "backmenu"
}
</script>
