<script>
export default {
name: "MyAside",
  props:{
  isCollapse:Boolean
  }
}
</script>

<template>
  <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 120vh"
      mode="vertical"
      default-active="/Home"
      :collapse="isCollapse"
      :collapse-transition="false">
  <el-menu-item index="/Home">
    <i class="el-icon-s-home"></i>
    <span slot="title">首页</span>
  </el-menu-item>

    <el-menu-item index="/1">
      <i class="el-icon-s-flag"></i>
      <span slot="title">导航一</span>
    </el-menu-item>

    <el-menu-item index="/2">
      <i class="el-icon-s-opportunity"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>