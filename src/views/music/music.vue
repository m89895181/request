/*
 * @Author: 苑振东 
 * @Date: 2019-09-04 19:50:12 
 * @Last Modified by: 苑振东
 * @Last Modified time: 2019-09-06 10:35:43
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
          <!-- start   dialog ==> delete -->
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
              <input type="file" @change="upload" />
              <img :src="form.pic" alt style="width:50px" />
              {{form.pic}}
            </el-form-item>
            <el-form-item label="是否上架" :label-width="formLabelWidth">
              <el-checkbox v-model="form.isup" auto-complete="off"></el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEnter">确 定</el-button>
          </div>
        </el-dialog>
        <!-- end dialog==> add/change -->
        <!-- start 分页器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleChange"
          :page-size="limit"
        ></el-pagination>
        <!-- end 分页器 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      pagenum: 1,
      total: 10,
      limit: 2,
      dialogVisible: false,
      myMsg: "",
      changeList: false,
      dialogFormVisible: false,
      form: {
        music_name: "",
        singer_name: "",
        pic: "",
        isup: true
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
    this.$api.music
      .getMusic({ pagenum: this.pagenum, limit: this.limit })
      .then(res => {
        if (res.data.code == 1) {
          this.total = res.data.total;
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
      // 修改添加公用函数
      // 判断是否传入参数 如果有参数则说明是修改 没有参数则是添加
      if (!index && !row) {
        this.changeList = false;
        this.form = {
          music_name: "",
          singer_name: "",
          pic: "",
          isup: true
        };
        this.myMsg = "添加";
      } else {
        this.changeList = true;
        this.form = row;
        row.isup == 1 ? (this.form.isup = 1) : 0;
        this.myMsg = "修改";
      }
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      // 删除
      this.msg = "删除";
      this.handleClose(row); // 调用弹窗关闭
    },
    handleClose(row) {
      this.$confirm(`确认${this.msg}？`)
        .then(_ => {
          this.$api.music.deleteMusic({ id: row.id }).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "成功"
              });
              // 判断删除的页码 是否需要向前追加请求数据
              this.curMusic.length <= 1 && this.pagenum > 1
                ? --this.pagenum
                : this.pagenum;
              this.$api.music
                .getMusic({ limit: this.limit, pagenum: this.pagenum })
                .then(res => {
                  this.total = res.data.total;
                  this.changeCurMusic(res.data.data);
                });
            }
          });
        })
        .catch(_ => {
          console.log(_);
        });
    },
    upload(e) {
      // 在事件源中取出文件域
      let file = e.target.files[0];
      // 创建实例
      let formdata = new FormData();
      // 添加参数
      formdata.append("file", file);
      // 请求上传图片的接口
      this.$api.music.upload(formdata).then(res => {
        if (res.data.code == 1) {
          this.form.pic = "http://localhost:3000" + res.data.url;
        }
      });
    },
    handleEnter() {
      // 点击确定判断是添加的dialog还是修改的dialog
      // this.form.isup == 1 || true ? 1 : 0;
      this.form.isup = this.form.isup ? "1" : "0";
      if (this.myMsg == "添加") {
        this.$api.music.addmusic(this.form).then(res => {
          if (res.data.code === 1) {
            this.$api.music
              .getMusic({ pagenum: this.pagenum, limit: this.limit })
              .then(res => {
                if (res.data.code == 1) {
                  this.total = res.data.total;
                  this.changeCurMusic(res.data.data);
                } else {
                  this.$message({
                    type: "error",
                    message: "失败"
                  });
                }
              });
          } else {
            this.$message({
              type: "error",
              message: "失败"
            });
          }
        });
      } else {
        this.$api.music.updatemusic(this.form).then(res => {
          if (res.data.code === 1) {
            this.$api
              .getMusic({ pagenum: this.pagenum, limit: this.limit })
              .then(res => {
                if (res.data.code == 1) {
                  this.total = res.data.total;
                  this.changeCurMusic(res.data.data);
                }
              });
          }
        });
      }
      this.dialogFormVisible = false;
    },
    handleChange(val) {
      // 分页器页码改变触发函数
      console.log(this.total, this.limit);
      this.pagenum = val;
      console.log(val);
      this.$api.music
        .getMusic({ pagenum: val, limit: this.limit })
        .then(res => {
          this.changeCurMusic(res.data.data);
        });
    }
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