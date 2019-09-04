<template>
  <el-form
    :model="ruleForm2"
    status-icon
    :rules="rules2"
    ref="ruleForm2"
    label-width="100px"
    class="demo-ruleForm m-demo-from"
  >
    <el-form-item label="用户名" prop="user">
      <el-input v-model="ruleForm2.user"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from "@/api/";
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        user: ""
      },
      rules2: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        user: [{ required: true, validator: checkUser, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.user
            .login({
              username: this.ruleForm2.user,
              password: this.ruleForm2.pass
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$message("登录成功");
                console.log(res);
                let token = localStorage.setItem("token", res.data.token);
                this.$router.replace("/music");
              } else {
                this.$message.error("用户名或密码错误");
              }
            });
        } else {
          this.$message.error("输入有误");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>