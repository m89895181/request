/*
 * @Author: 苑振东 
 * @Date: 2019-09-04 19:49:58 
 * @Last Modified by:   苑振东 
 * @Last Modified time: 2019-09-04 19:49:58 
 */
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    this.$api.user.login({ username: "111", password: "11" });
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.m-demo-from {
  margin-top: 100px;
  width: 300px;
  margin: 100px auto 0;
}
</style>
