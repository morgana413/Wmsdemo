<script>
export default {
  name: "MyLogin",
  data() {
    return {
      confirm_disabled: false,
      loginForm:{
        no:'',
        password:'',
      },
      rules: {
        no: [
          {required:true,message:'请输入账号',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    confirm(){
      this.confirm_disabled = true;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios.post(this.$httpUrl+'/user/login',this.loginForm ).then(res=>res.data).then(res=>{
            console.log(res)
            if (res.code==200){
              sessionStorage.setItem("CurUser",JSON.stringify(res.data.user));
              console.log(res.data.menu);
              this.$store.commit('setMenu',res.data.menu);
              this.$router.replace('/index');
            }else{
              this.confirm_disabled = false;
              alert('检测失败，用户名或密码错误！');
              return false;
            }
          });
        }else {
          this.confirm_disabled = false;
          console.log('检测失败');
          return false;
        }
      });
    }
  }
}
</script>

<template>
<div class="loginBody">
  <div class="loginDiv">
    <div class="login-content">
      <h1 class="login-title">用户登录</h1>
      <el-form :model="loginForm" label-width="100px"
                :rules="rules" ref="loginForm">
        <el-form-item label="账号" prop="no">
            <el-input style="width: 200px" type="text" v-model="loginForm.no"
                      autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input style="width: 200px" type="password" v-model="loginForm.password"
            show-password autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm" :disabled="confirm_disabled">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<style scoped>
    .loginBody{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #B3C0D1;
    }
    .loginDiv{
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      margin-left: -250px;
      width: 450px;
      height: 330px;
      background: #fff;
      border-radius: 5%;
    }
    .login-title{
      margin:20px 0;
      text-align: center;
    }
    .login-content{
      width: 400px;
      height: 250px;
      position: absolute;
      top: 25px;
      left: 25px;
    }
</style>