<template>
  <!-- <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div> -->
  <div>
    <section id="banner" class="banner">
      <div class="content">
        <h3>华为“智能基座”-TASK</h3>
        <p>开源、互助、共同成长</p>
      </div>
    </section>

    <!-- banner section ends -->

    <!-- posts section starts  -->

    <section id="posts" class="container">
      <div class="posts-container">
        <div class="post">
          <p class="title">已完成</p>

          <el-table
            :data="
              finishitableData.slice(
                (currentnum - 1) * pagesize,
                pagenum * pagesize
              )
            "
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="任务id" width="200" />
            <el-table-column prop="name" label="任务名称" width="350" />
            <!-- username -->
            <!-- <el-table-column prop="username" label="姓名" width="180" /> -->
            <el-table-column prop="updated" label="完成日期" width="250" />
            <el-table-column prop="statu" label="详情按钮">
              <template slot-scope="scope">
                <!-- scope.row 包含表格里当前行的所有数据 -->
                <el-button
                  v-if="!isAdmin"
                  type="text"
                  @click="task_detail_common(scope.row.detail)"
                  >任务详情</el-button
                >
                <el-button
                  v-if="isAdmin"
                  type="text"
                  @click="
                    show_table();
                    task_detail_admin(scope.row.id);
                  "
                  >任务详情</el-button
                >
                <el-drawer
                  title="任务完成情况"
                  :visible.sync="table"
                  direction="rtl"
                  size="50%"
                >
                  <h3>已完成</h3>
                  <el-table :data="taskFinishForAdmin" max-height="300">
                    <el-table-column
                      property="id"
                      label="任务id"
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      property="username"
                      label="姓名"
                      width="250"
                    ></el-table-column>
                    <el-table-column
                      property="warningcount"
                      label="警告次数"
                    ></el-table-column>
                  </el-table>
                  <h3>未完成</h3>
                  <el-table :data="taskUnfinishForAdmin" max-height="300">
                    <el-table-column
                      property="id"
                      label="任务id"
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      property="username"
                      label="姓名"
                      width="250"
                    ></el-table-column>
                    <el-table-column
                      property="warningcount"
                      label="警告次数"
                    ></el-table-column>
                  </el-table>
                </el-drawer>
              </template>
            </el-table-column>
            <div class="block">
              <!-- <span class="demonstration">完整功能</span> -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :hide-on-single-page="value"
                :current-page="pagenum"
                :page-sizes="[20, 40, 80, 120]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.finishitableData.length"
              >
              </el-pagination>
            </div>
          </el-table>
        </div>

        <div class="post">
          <p class="title">未完成</p>
          <el-table
            :data="
              unfinishitableData.slice(
                (currentnum - 1) * pagesize,
                pagenum * pagesize
              )
            "
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="任务id" width="200" />
            <el-table-column prop="name" label="任务名称" width="350" />
            <!-- username -->
            <el-table-column prop="deadline" label="截止时间" width="250" />
            <el-table-column prop="statu" label="详情按钮">
              <template slot-scope="scope">
                <!-- scope.row 包含表格里当前行的所有数据 -->
                <el-button
                  v-if="!isAdmin"
                  type="text"
                  @click="task_detail_common(scope.row.detail)"
                  >任务详情</el-button
                >
                <el-button
                  v-if="isAdmin"
                  type="text"
                  @click="
                    show_table();
                    task_detail_admin(scope.row.id);
                  "
                  >任务详情</el-button
                >
                <el-drawer
                  title="任务完成情况"
                  :visible.sync="table"
                  direction="rtl"
                  size="50%"
                >
                  <h3>已完成</h3>
                  <el-table :data="taskFinishForAdmin" max-height="300">
                    <el-table-column
                      property="id"
                      label="任务id"
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      property="username"
                      label="姓名"
                      width="250"
                    ></el-table-column>
                    <el-table-column
                      property="warningcount"
                      label="警告次数"
                    ></el-table-column>
                  </el-table>
                  <h3>未完成</h3>
                  <el-table :data="taskUnfinishForAdmin" max-height="300">
                    <el-table-column
                      property="id"
                      label="任务id"
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      property="username"
                      label="姓名"
                      width="250"
                    ></el-table-column>
                    <el-table-column
                      property="warningcount"
                      label="警告次数"
                    ></el-table-column>
                  </el-table>
                </el-drawer>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="created"
              label="创建日期"
              width="180"
            /> -->
            <div class="block">
              <!-- <span class="demonstration">完整功能</span> -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :hide-on-single-page="value"
                :current-page="pagenum1"
                :page-sizes="[20, 40, 80, 120]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.unfinishitableData.length"
              >
              </el-pagination>
            </div>
          </el-table>
        </div>
      </div>

      <div class="sidebar">
        <div class="box">
          <!-- <h3 class="title">popular tags</h3> -->
          <div class="tags">
            <a href="#">华为云</a>
            <a href="#">昇腾</a>
            <a href="#">鸿蒙</a>
          </div>
        </div>
      </div>
    </section>

    <!-- posts section ends -->

    <!-- contact section starts  -->

    <!-- contact section ends -->

    <!-- footer section starts  -->

    <section class="footer">
      <div class="follow">
        <a href="#" class="fab fa-facebook-f" />
        <a href="#" class="fab fa-twitter" />
        <a href="#" class="fab fa-instagram" />
        <a href="#" class="fab fa-linkedin" />
      </div>
      <div class="beian">
        <a href="https://beian.miit.gov.cn/" target="_blank"
          >桂ICP备2021009535号</a
        >
      </div>
    </section>

    <!-- footer section ends -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { task_list_finished, task_list_unfinished } from "@/api/task/task_list";
import {
  is_admin,
  task_unfinished_forAdmin,
  task_finished_forAdmin,
} from "@/api/task/admin";

export default {
  name: "Dashboard",
  data() {
    return {
      table: false,
      isAdmin: 1,
      value: false,
      currentnum: "",
      pagenum1: "",
      pagenum: 1,
      pagesize: 20,
      finishedList: null,
      Author: null,

      finishitableData: [],
      unfinishitableData: [],
      taskFinishForAdmin: [],
      taskUnfinishForAdmin: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    this.getFinishedList();
    this.getUnfinishedList();
    var Author = localStorage.getItem("Authorization");
    var Username = localStorage.getItem("username");
    console.log(Username);
    // var reg = new RegExp('"', 'g')
    // Author = Author.replace(reg, '')
    // console.log('Author' + Author)
    this.Author = Author;
    // console.log('hehe' + Authorization)
    // const t = this
    task_list_finished(Author, Username)
      .then((response) => {
        //console.log('wancheng')
        //console.log(response.result.list)
        // this.list = response.data.items
        this.finishitableData = response.result.list;
        // console.log(this.finishitableData)
      })
      .catch((err) => {
        console.log(err);
      });
    task_list_unfinished(Author, Username)
      .then((response) => {
        this.unfinishitableData = response.result.list;
        // this.list = response.data.items
      })
      .catch((err) => {
        console.log(err);
      });
    is_admin(Author)
      .then((response) => {
        console.log(response.result);
        if (response.result[0] === "ROLE_normal") this.isAdmin = 0;
        //console.log(this.isAdmin)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    async getFinishedList() {
      this.finishedList = this.finishitableData;
    },
    async getUnfinishedList() {
      this.unfinishedList = this.unfinishitableData;
      console.log("hahahahah");
    },
    //重新获取数据
    handleSizeChange(val) {
      console.log("每页 ${val} 条");
      this.pagesize = val;
      this.handleCurrentChange(1);
      this.getFinishedList();
    },
    handleCurrentChange(val) {
      console.log("当前页: ${val}");
      this.pagenum = val;
      this.getFinishedList();
    },

    task_detail_common(value) {
      this.$alert(value, "任务详情", {
        confirmButtonText: "确定",
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      });
    },
    task_detail_admin(value) {
      //console.log(value);
      var Author = localStorage.getItem("Authorization");
      console.log(Author);
      task_finished_forAdmin(Author, value)
        .then((response) => {
          // console.log(value)
          // console.log(response.result);
          this.taskFinishForAdmin = response.result.list;
        })
        .catch((err) => {
          console.log(err);
        });
      task_unfinished_forAdmin(Author, value)
        .then((response) => {
          console.log(response.result);
          this.taskUnfinishForAdmin = response.result.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    show_table() {
      this.table = true;
    },
    //console.log(this.unfinishitableData.detail)
  },
};
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.task_image {
  float: left;
}
.task {
  padding: 0rem 0rem 0rem 9rem;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
:root {
  --orange: #e67e22;
  --black: #333;
  --light-color: #777;
  --border: 0.1rem solid rgba(0, 0, 0, 0.2);
  --box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  border: none;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: lighter;
}

section {
  padding: 2rem 7%;
}

.btn {
  margin-top: 1rem;
  display: inline-block;
  background: var(--black);
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.9rem 3rem;
  cursor: pointer;
  font-size: 1.7rem;
}

.btn:hover {
  background: var(--orange);
}

#menu-bars {
  display: none;
}

.banner {
  min-height: 60vh;
  background: url(./images/pic1.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  padding-top: 8rem;
}

.banner .content {
  text-align: center;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
  padding: 3rem;
  max-width: 50rem;
}

.banner .content h3 {
  font-size: 4rem;
  color: var(--black);
  text-transform: uppercase;
}

.banner .content p {
  font-size: 1.7rem;
  color: var(--light-color);
  padding: 1rem 0;
  line-height: 1.5;
}

.container {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 1.5rem;
  background: #eee;
}

.container .posts-container .post {
  width: 100%;
  padding: 2rem;
  background: #fff;
  border: var(--border);
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.container .posts-container .post .image {
  // height: 40rem;
  width: 8rem;
  height: 8rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.container .posts-container .post .date {
  padding-top: 2rem;
  font-size: 1.5rem;
  color: var(--orange);
}

.container .posts-container .post .title {
  padding-top: 0rem;

  font-size: 2rem;
  color: var(--black);
}

.container .posts-container .post .text {
  color: var(--light-color);
  font-size: 1.6rem;
  line-height: 1.7;
  padding: 1rem 0;
}

.container .posts-container .links {
  border-top: var(--border);
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
}

.container .posts-container .links .user {
  margin-right: auto;
}

.container .posts-container .links .icon {
  padding-right: 1rem;
}

.container .posts-container .links a {
  font-size: 1.5rem;
  color: var(--light-color);
}

.container .posts-container .links a i {
  padding-right: 0.2rem;
  color: var(--black);
}

.container .posts-container .links a:hover {
  color: var(--orange);
}

.container .posts-container .links a:hover i {
  color: var(--orange);
}

.container .sidebar .box {
  border: var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
  background: #fff;
  margin-bottom: 1.5rem;
}

.container .sidebar .box .title {
  padding: 1.5rem;
  font-size: 2rem;
  color: #fff;
  background: var(--black);
  text-transform: capitalize;
}

.container .sidebar .box .about {
  text-align: center;
  padding: 1rem 1.5rem;
}

.container .sidebar .box .about img {
  height: 15rem;
  width: 15rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 1rem 0;
}

.container .sidebar .box .about h3 {
  color: var(--orange);
  font-size: 2rem;
}

.container .sidebar .box .about p {
  color: var(--light-color);
  font-size: 1.5rem;
  line-height: 1.5;
  padding: 1rem;
}

.container .sidebar .box .about .follow {
  padding: 1rem 0;
}

.container .sidebar .box .about .follow a {
  height: 4rem;
  line-height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background: var(--black);
  color: #fff;
  font-size: 1.7rem;
  margin: 0 0.1rem;
}

.container .sidebar .box .about .follow a:hover {
  background: var(--orange);
}

.container .sidebar .box .category {
  padding: 1rem 1.5rem;
}

.container .sidebar .box .category a {
  padding: 0.4rem 0;
  font-size: 1.5rem;
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container .sidebar .box .category a span {
  background: var(--light-color);
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.container .sidebar .box .category a:hover {
  color: var(--orange);
}

.container .sidebar .box .category a:hover span {
  background-color: var(--orange);
}

.container .sidebar .box .p-post {
  padding: 1rem 2rem;
}

.container .sidebar .box .p-post a {
  padding: 1rem 0;
  display: block;
}

.container .sidebar .box .p-post a h3 {
  color: var(--black);
  font-size: 2rem;
  padding-bottom: 1rem;
}

.container .sidebar .box .p-post a span {
  color: var(--light-color);
  font-size: 1.5rem;
}

.container .sidebar .box .p-post a span i {
  padding-right: 0.2rem;
}

.container .sidebar .box .p-post a:hover h3 {
  color: var(--orange);
}

.container .sidebar .box .tags {
  padding: 1rem;
}

.container .sidebar .box .tags a {
  display: inline-block;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  color: var(--black);
  border-radius: 0.5rem;
  border: var(--border);
  margin: 0.5rem;
}

.container .sidebar .box .tags a:hover {
  background: var(--black);
  color: #fff;
}

.contact {
  // background:url(../images/contact-bg.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.contact form {
  background: #fff;
  box-shadow: var(--box-shadow);
  border-radius: 0.5rem;
  margin: 2rem auto;
  max-width: 70rem;
  padding: 2rem;
}

.contact form h3 {
  color: var(--black);
  text-align: center;
  padding-bottom: 1.5rem;
  font-size: 3rem;
  text-transform: capitalize;
}

.contact form .inputBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.contact form .inputBox input,
.contact form textarea {
  width: 100%;
  background: #eee;
  padding: 1rem;
  margin: 0.7rem 0;
  border-radius: 0.5rem;
  color: var(--black);
  font-size: 1.7rem;
}

.contact form .inputBox input {
  width: 49%;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer .credit {
  text-transform: capitalize;
  font-size: 2rem;
  color: var(--black);
  padding: 1rem 0;
}

.footer .credit span {
  color: var(--orange);
}

.footer .follow {
  padding: 1rem 0;
}

.footer .follow a {
  height: 4.5rem;
  line-height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
  font-size: 1.7rem;
  background: var(--black);
  color: #fff;
  margin: 0 0.1rem;
  text-align: center;
}

.footer .follow a:hover {
  background: var(--orange);
}

.footer .beian a {
  font-size: 12px;
  text-decoration: none;
  color: #bbb;
}

/* media queries  */

@media (max-width: 991px) {
  html {
    font-size: 55%;
  }

  .header {
    padding: 1.5rem;
  }

  section {
    padding: 2rem;
  }

  .container {
    grid-template-columns: 2fr 1fr;
  }
}

@media (max-width: 768px) {
  #menu-bars {
    display: inline-block;
  }

  .header .search-form {
    top: 100%;
    left: 0;
    right: 0;
    border-top: var(--border);
    width: 100%;
    border-radius: 0;
  }

  .header .navbar {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border-top: var(--border);
    border-bottom: var(--border);
    background: #fff;
    display: none;
  }

  .header .navbar.active {
    display: block;
  }

  .header .navbar a {
    display: block;
    background: #f7f7f7;
    padding: 1.5rem;
    margin: 1.5rem;
    border-radius: 0.5rem;
    border: var(--border);
  }

  .container {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .container .posts-container .post .image {
    height: 30rem;
  }

  .footer {
    flex-flow: column;
    text-align: center;
  }
}

@media (max-width: 450px) {
  html {
    font-size: 50%;
  }

  .contact form .inputBox input {
    width: 100%;
  }
}
</style>
