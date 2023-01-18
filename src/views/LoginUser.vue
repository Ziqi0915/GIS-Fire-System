<template>
  <!-- 登陆页面 -->
  <div class="LoginUser">
    <div class="login-input">
      <div class="login-top"><h1>GIS-based forest fire rescue system</h1></div>
      <div class="logo">
        <img
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-1df51d17-4013-4d86-a2cf-431494c2d1d0/aa90e23b-d4fa-486b-b123-0c78daa9e048.png"
          alt=""
        />
      </div>
      <div class="login-main">
        <el-form
          label-position="right"
          label-width="75px"
          :model="formLabelAlign"
        >
          <el-form-item label="username">
            <el-input
              placeholder="Please enter your username"
              v-model="formLabelAlign.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="password">
            <el-input
              placeholder="Please enter your password"
              show-password
              v-model="formLabelAlign.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button class="loginBtn" @click="clickLogin" type="info"
            >Login</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginUser",
  components: {},

  data() {
    return {
      formLabelAlign: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    clickLogin() {
      // console.log(this.formLabelAlign);
      if (
        this.formLabelAlign.username === "" ||
        this.formLabelAlign.password === ""
      ) {
        this.$notify({
          title: "warning",
          message: "Please enter your password or username",
          type: "warning",
        });
      } else {
        if (
          this.formLabelAlign.username === "ziqi" &&
          this.formLabelAlign.password === "123456"
        ) {
          sessionStorage.setItem("username", "admin");
          this.$notify({
            title: "success",
            message: "success",
            type: "success",
          });
          this.$router.push("/WareHouseMain");
        } else {
          this.$notify.error({
            title: "fail",
            message: "wrong username or password",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.LoginUser {
  width: 100%;
  height: 100vh;
  background-image: url("../../public/Swiss_National_Park_131.jfif");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.LoginUser .login-input {
  position: relative;
  width: 700px;
  height: 400px;
  background-color: hsla(0, 0%, 100%, 0.7);
  border-radius: 15px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0; */
}
.LoginUser .login-input .login-top {
  width: 100%;
  height: 100px;
  background-color: hsla(0, 0%, 100%, 0.8);
  /* border-radius: 15px; */
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  line-height: 80px;
  text-align: center;
  font-weight: 200; 
}
.LoginUser .login-input .logo {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  overflow: hidden;
  position: absolute;
  top: 70px;
  left: 50%;
  margin-left: -30px;
  z-index: 999;
}
.LoginUser .login-input .logo img {
  width: 60px;
  height: 60px;
}
.LoginUser .login-input .login-main {
  padding: 2px;
  margin-top: 40px;
  margin-left: 30px;
}
.LoginUser .login-input .login-main .btn {
  text-align: center;
}
.LoginUser .login-input .login-main .btn .loginBtn {
  width: 40%;
}
</style>