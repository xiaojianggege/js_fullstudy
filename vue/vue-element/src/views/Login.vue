<template>
  <div class="login">
    <h2>旅梦后台管理系统</h2>
    <div class="login-wrapper">
      <p class="input">
        <el-input placeholder="请输入账号" v-model="user" clearable></el-input>
      </p>
      <p class="input">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </p>
      <p class="btn"><el-button type="primary" round @click="login">登录</el-button></p>
       
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: "",
    };
  },
  methods: {
    login() {
      if(!this.user || !this.password) {
        this.$message.error('账号和密码不能为空');
      }else{
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        this.goHome()
      }
    },
    goHome() {
      this.$router.push({name: 'Home',params: {name: this.user}})
    }
  }
};
</script>

<style scope>
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0DBC79;
}
.login-wrapper{
  margin-top: 30px;
}
.input{
  margin-bottom: 20px;
  width: 250px;
}
.btn button{
  width: 100%;
}
</style>