<script>
export default {
name: "MyAside",
  data(){
  return {
/*    menu:[
      {
        menuClick:'Admin',
        menuName:'管理员管理',
        menuIcon:'el-icon-s-custom'
      },{
        menuClick:'User',
        menuName:'用户管理',
        menuIcon:'el-icon-user-solid'
      }

    ]*/
  }
  },
  computed:{
  "menu":{
    get(){
      return this.$store.state.menu;
    }
  }
  },
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
      :default-active="$route.path"
      :collapse="isCollapse"
      :collapse-transition="false"
      router>
  <el-menu-item index="/MyMain">
    <i class="el-icon-s-home"></i>
    <span slot="title">首页</span>
  </el-menu-item>

    <el-menu-item
        v-for="(item,i) in menu"
        :key="i"
        :index="'/index/' + item.menuClick.toLowerCase()">
      <i :class="item.menuIcon"></i>
      <span slot="title">{{ item.menuName }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>