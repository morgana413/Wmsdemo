<script>
export default {
  name: "MyHeader",
  data(){
    return {
      user:JSON.parse(sessionStorage.getItem("CurUser")),
    }
  },
  props: {
    icon: String
  },
  methods:{
    toUser(){
      console.log('to_user')
      this.$router.push('/Home')
    },
    logout(){
      console.log('log_out')
      this.$confirm('您确定要退出登录吗？','提示',{
        confirmButtonText:'确定',
        type:"warning",
        center:true
      })
          .then(() => {
            this.$message({
              type:"success",
              message:'退出登陆成功'
            })
            this.$router.push('/')
            sessionStorage.clear()
          })
          .catch(() => {
            this.$message({
              type:"info",
              message:'已取消退出登陆'
            })
          });
    },
    collapse(){
      this.$emit('doCollapse')
    }
  },
  created () {
this.$router.push('/Home')
  }
}
</script>

<template>
  <div style="display: flex; line-height: 90px;justify-content: space-between; align-items: center">
    <div style="margin-top: 8px; ">
      <i :class="icon" style="font-size: 20px;cursor:pointer;" @click="collapse"></i>
    </div>
    <div style="flex:1 ; text-align: center;font-size: 34px;padding: 0 20px">
      <span>欢迎来到仓库管理系统</span>
    </div>
  <el-dropdown>
    <span>{{ user.name }}</span> <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
      <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<style scoped>

</style>