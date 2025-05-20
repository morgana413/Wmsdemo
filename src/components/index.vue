<script>
import MyAside from "@/components/MyAside.vue";
import MyHeader from "@/components/MyHeader.vue";
import MyMain from "@/components/MyMain.vue";

export default {
name: "IndexPage",
  components: {MyAside,MyHeader,MyMain}
}
</script>

<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 100%;margin-left:-1px ">
    <MyAside></MyAside>
    </el-aside>

    <el-container style="height: 100%;">
      <el-header style="text-align: right; font-size: 12px;height:100%;border-bottom:darkgrey 1px solid;">
    <MyHeader></MyHeader>
      </el-header>

      <el-main style="height: 100%;">
          <MyMain></MyMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.el-main{
  padding: 5px;
}
.el-aside {
  color: #333;
}
</style>