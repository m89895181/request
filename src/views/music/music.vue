<template>
  <el-container>
    <el-header class="m-header">
      <div>
        <span>欢迎：{{username}}</span>
        <el-button size="mini" type="primary" @click="quit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  created() {
    this.$api.user.userinfo().then(res => {
      if (res.data.code == 1) {
        this.changeUserName(res.data.data.username);
      }
    });
  },
  methods: {
    ...mapMutations(["changeUserName"]),
    quit() {
      this.$confirm("确认退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //1.删除token
        //2.跳登录路由
        localStorage.removeItem("token");
        this.$router.push("/login");
      });
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  }
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.m-header {
  text-align: right;
}
</style>