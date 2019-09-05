/*
 * @Author: 苑振东 
 * @Date: 2019-09-04 19:50:12 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-05 14:56:50
 */
<template>
  <el-container class="m-wraper-music">
    <el-header class="m-header">
      <div>
        <span style="float:left">logo</span>
        <span style="margin-right:5px">欢迎：{{username}}</span>
        <el-button size="mini" type="primary" @click="quit">退出</el-button>
      </div>
    </el-header>
    <el-container class="m-container">
      <el-aside width="200px">音乐列表</el-aside>
      <el-main>
        <!-- start table -->
        <span style="float:left">音乐列表</span>
        <el-button style="float:right" @click="handleEdit()">添加</el-button>
        <el-table :data="curMusic" style="width: 100%">
          <el-table-column label="序号" width="180" type="index"></el-table-column>
          <el-table-column label="歌名" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.music_name }}</span>
            </template>
          </el-table-column>
          <!-- start img  ==>pic -->
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.pic" alt style="width:50px" />
            </template>
          </el-table-column>
          <!-- end img ==>pic -->
          <!-- start singer  ==>singer -->
          <el-table-column label="歌手" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.singer_name}}</span>
            </template>
          </el-table-column>
          <!-- end singer ==>singer -->
          <!-- start up  ==>up -->
          <el-table-column label="是否上架" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.isup==1?'是':"否"}}</span>
            </template>
          </el-table-column>
          <!-- end up ==>up -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <!-- start dialog==>delete -->
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>

          <!-- end dialog==>delete -->
        </el-table>
        <!-- end table -->
        <!-- start dialog==> add/change-->
        <el-dialog :title="myMsg" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="歌名" :label-width="formLabelWidth">
              <el-input v-model="form.music_name" :value="form.music_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="歌手" :label-width="formLabelWidth">
              <el-input v-model="form.singer_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-input v-model="form.pic" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否上架" :label-width="formLabelWidth">
              <el-checkbox v-model="form.isup" auto-complete="off"></el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <!-- end dialog==> add/change -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      myMsg: "",
      changeList: false,
      dialogFormVisible: false,
      form: {
        music_name: "",
        singer_name: "",
        pic: "",
        isup: null
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.$api.user.userinfo().then(res => {
      if (res.data.code == 1) {
        this.changeUserName(res.data.data.username);
      }
    });
    this.$api.music.getMusic({ pagenum: "1", limit: "10" }).then(res => {
      if (res.data.code == 1) {
        this.changeCurMusic(res.data.data);
      }
    });
  },
  methods: {
    ...mapMutations(["changeUserName", "changeCurMusic", "getMusic"]),
    quit() {
      (this.msg = "退出"),
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
    },
    handleEdit(index, row) {
      // 判断是否传入参数 如果有参数则说明是修改 没有参数则是添加
      if (!index && !row) {
        this.changeList = false;
        this.form = {
          music_name: "",
          singer_name: "",
          pic: "",
          isup: false
        };
        this.myMsg = "添加";
      } else {
        this.changeList = true;
        this.form = row;
        row.isup == 1 ? (this.form.isup = true) : false;
        this.myMsg = "修改";
      }
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.msg = "删除";
      this.handleClose(row);
    },
    handleClose(row) {
      this.$confirm(`确认${this.msg}？`)
        .then(_ => {
          this.$api.music.deleteMusic({ id: row.id }).then(res => {
            if (res.data.code == 1) {
              this.$api.music.getMusic({ limit: 10, pagenum: 1 }).then(res => {
                this.changeCurMusic(res.data.data);
              });
            }
          });
        })
        .catch(_ => {
          console.log(_);
        });
    }
    // handleAdd() {
    //   this.changeList = false;
    //   this.handleEdit();
    // },
    // handleChange(index, row) {
    //   this.changeList = true;
    //   this.handleEdit(index, row);
    // }
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      curMusic: state => state.music.curMisicList
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
.m-container {
  height: 100%;
}
.m-wraper-music {
  width: 100%;
  height: 100%;
}
</style>