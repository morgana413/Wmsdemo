<script>
import MyAside from "@/components/MyAside.vue";
import MyHeader from "@/components/MyHeader.vue";


export default {
  name: "IndexPage",
  components: {MyAside, MyHeader},
  data() {
    return {
      isCollapse: false,
      aside_width: "200px",
      icon:'el-icon-s-fold'
    }
  },
  methods: {
    doCollapse() {
      this.isCollapse = !this.isCollapse;
      if (!this.isCollapse) {
        this.icon='el-icon-s-fold'
        this.aside_width='200px'//展开
      }else{//关闭
        this.icon='el-icon-s-unfold'
        this.aside_width='64px'
      }
    }
  }
}
</script>

<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246);height: 100%;margin-left:-1px ">
    <MyAside :isCollapse ="isCollapse"></MyAside>
    </el-aside>

    <el-container style="height: 100%;">
      <el-header style="text-align: right; font-size: 12px;height:100%;border-bottom:darkgrey 1px solid;">
    <MyHeader @doCollapse="doCollapse" :icon="icon"></MyHeader>
      </el-header>

      <el-main style="height: 100%;">
        <router-view/>
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