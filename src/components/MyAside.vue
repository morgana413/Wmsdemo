<script>
export default {
name: "MyAside",
  data(){
  return {
  }
  },
  computed:{
  "menu"() {
    return this.$store.state.menu;
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
    <el-menu-item
        v-for="(item,i) in menu"
        :key="i"
        :index="item.menuClick">
      <i :class="item.menuIcon"></i>
      <span slot="title">{{ item.menuName }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>