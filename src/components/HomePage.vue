<template>
  <div class="MainPage">
    <!-- 导航菜单 -->
    <div class="MenuTop">
      <div class="logo">
        <span class="logoSpan" style="fons-size: 18px" @click="goHome"
          >GIS-based forest fire rescue system</span
        >
      </div>
      <el-menu
        router
        style="width: 80%"
        default-active="WareHouseMain"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#435560"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="WareHouseMain">Fire Data Display</el-menu-item>

        <el-menu-item index="MeasureMap">Map Calculation</el-menu-item>
        <el-menu-item index="FmenHotMap">Heat map of fire rescue workers</el-menu-item>

        <el-submenu index="planeBox">
          <template slot="title">Rescue Planning</template>
          <el-menu-item index="FmenNearPlan">Peripheral Rescue Planning</el-menu-item>
          <el-menu-item index="FireBuffer">Fire buffer zone analysis</el-menu-item>
        </el-submenu>

        <el-menu-item @click="signOut" index="signOut">Logout</el-menu-item>
      </el-menu>
    </div>

    <router-view />
  </div>
</template>
<script type="text/javascript">
window._AMapSecurityConfig = {
  securityJsCode: "5885da62a0da2ca7cf5d212e6b671140",
};
</script>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    signOut() {
      sessionStorage.removeItem("username");
      this.$notify({
        title: "成功",
        message: "账户退出成功",
        type: "success",
      });
      this.$router.push("/login");
    },

    goHome() {
      this.$router.push("/WareHouseMain");
    },
  },
};
</script>

<style >
.logo {
  width: 20%;
  background-color: #435560;
  height: 60px;
}
.MenuTop {
  color: white;
  line-height: 60px;
  display: flex;
}
.MenuTop .logo span {
  font-size: 18px !important;
  cursor: pointer;
  padding-left: 15px;
}
</style>
