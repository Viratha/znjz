/* eslint-disable vue/require-v-for-key */
<template>
  <!-- <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div> -->
  <div>
    <section
      id="banner"
      class="banner"
      :style="{ background: 'url(' + home_bg + ')' ,'background-size':'cover'}"
    >
      <div class="content">
        <h3>华为“智能基座”-TASK</h3>
        <p>开源、互助、共同成长</p>
      </div>
    </section>

    <!-- banner section ends -->

    <!-- posts section starts  -->

    <section id="posts" class="container">
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
      <div v-cloak v-if="isAdmin" class="barBtn">
        <el-button
          type="plain"
          plain
          icon="el-icon-plus"
          size="mini"
          style="width: 100px; height: 50px;"
          @click="handleAdd"
        >新增任务</el-button>
        <el-button
          type="plain"
          plain
          icon="el-icon-plus"
          size="mini"
          style="width: 100px; height: 50px;"
          @click="register"
        >新增账号</el-button>
        <el-button
          type="plain"
          plain
          icon="el-icon-plus"
          size="mini"
          style="width: 100px; height: 50px;"
          @click="getUsername(Author),usernameTable = true"
        >注销账号</el-button>
        <el-drawer
          title="选择要注销的账号"
          :visible.sync="usernameTable"
          direction="rtl"
          size="50%"
        >
          <el-table
            ref="multipleTable"
            :visible.sync="usernameTable"
            :data="usernameData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              label="用户名"
              width="100%"
              prop="username"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
          </el-table>
        </el-drawer>
      </div>

      <!-- <div v-for="(item) in list" class="posts-container"> -->
      <div v-for="(item, index) in list" class="posts-container">
        <!-- <p v-for="(item) in list">{{ item }}</p> -->
        <div class="post">
          <div class="task_all">
            <div class="task_image">
              <img :src="item.avatar" alt="" class="image">
            </div>
            <div class="task">
              <!-- <p>{{ item }}</p> -->
              <p class="title">{{ item.name }}</p>
              <!-- <p class="text">{{ item.detail }}</p> -->
              <p v-if="item.statu == 0" style="color: red" class="text">
                已截止
              </p>
              <p v-if="item.statu == 1" style="color: green" class="text">
                未截止
              </p>
            </div>
          </div>
          <div class="button_task">
            <!-- <el-button>详情</el-button> -->
            <!-- <template slot-scope="scope"> -->
            <!-- scope.row 包含表格里当前行的所有数据 -->
            <!-- <el-button
              v-if="!isAdmin && this.table"
              type="text"
              @click="task_detail_common(item.detail)"
            >任务详情</el-button>
            <el-button
              v-if="isAdmin"
              type="text"
              @click="
                show_table();
                task_detail_admin(item.id);
              "
            >任务详情</el-button> -->
            <!-- </template> -->
            <el-button
              v-if="isAdmin"
              @click="
                show_drawer(index);
                task_detail_admin(item.id);
              "
            >任务详情</el-button>
            <el-button
              v-if="isAdmin"
              @click="task_file_download(item.id), openFullScreen"
            >下载学员任务</el-button>

            <!-- <el-button
              v-if="!isAdmin"
              @click="
                task_detail_common(
                  item.detail + '   ' + '截止时间：' + item.deadline ,item.id
                )
              "
              >任务详情</el-button
            > -->
            <el-button
              v-if="!isAdmin"
              type="text"
              @click="
                show_dialog(index);
              "
            >任务详情</el-button>
            <el-dialog
              v-if="dialogIndex === index"
              title="任务详情"
              :visible.sync="dialogVisible"
              width="50%"
              height="40%"
              :before-close="handleClose"
              :v-on="task_detail_common(item.id)"
            >
              <span>{{ item.detail }}</span>
              <h3>截止日期：{{ item.deadline }}</h3>
              <h3 v-if="flag === '未完成'" style="color:red;" class="text"> {{ flag }} </h3>
              <h3 v-if="flag === '已完成'" style="color:green;" class="text"> {{ flag }} </h3>
              <!-- <span>{{item.deadline}}</span>
              <span>{{isFinish}}</span> -->
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="resetdialog()"
                >确 定</el-button>
              </span>
            </el-dialog>
            <el-button @click="handleup(item)">提交任务</el-button>
            <el-button
              v-show="isAdmin"
              icon="el-icon-delete"
              @click="handleDelete(item)"
            />
          </div>
          <!--
          <div class="date">
            <i class="far fa-clock" />
            <span>{{ item.updated }}</span>
          </div> -->
          <!-- <a href="#" class="user">
            <i class="far fa-user" />
            <span>by 牛掰娘</span>
          </a> -->
          <el-drawer
            v-if="drawerIndex === index"
            title="任务详情"
            :visible.sync="drawerVisible"
            direction="rtl"
            size="50%"
            class="overflowAuto"
          >
            <p class="detail">{{ item.detail }}</p>
            <span class="detail">deadline:{{ item.deadline }}</span>
            <p class="tableTitle">已完成</p>
            <el-table :data="taskFinishForAdmin" max-height="200">
              <el-table-column property="id" label="学员id" width="200" />
              <el-table-column property="username" label="姓名" width="250" />
              <el-table-column property="warningcount" label="警告次数" />
            </el-table>
            <p class="tableTitle">未完成(bug)</p>
            <el-table :data="taskUnfinishForAdmin" max-height="200">
              <el-table-column property="id" label="学员id" width="200" />
              <el-table-column property="username" label="姓名" width="250" />
              <el-table-column property="warningcount" label="警告次数" />
            </el-table>
          </el-drawer>
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
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
        >桂ICP备2021009535号</a>
      </div>
    </section>

    <!-- footer section ends -->
    <!-- 添加对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      height="500px"
      append-to-body
    >
      <el-form ref="form" :model="adddata" label-width="100px">
        <el-form-item label="任务名字" prop="name">
          <el-input
            v-model="adddata.name"
            type="text"
            placeholder="请输入任务名字"
          />
        </el-form-item>

        <el-form-item label="任务详情" prop="detail">
          <el-input
            v-model="adddata.detail"
            type="textarea"
            placeholder="请输入任务详情"
          />
        </el-form-item>

        <el-form-item label="任务持续时长" prop="time" label-width="100px">
          <el-input
            v-model="adddata.time"
            type="text"
            placeholder="单位min（从此刻开始计算）"
          />
        </el-form-item>

        <el-form-item label="发布全方向" prop="isAll" label-width="100px">
          <template>
            <el-radio v-model="isAll" :label="1">是</el-radio>
            <el-radio v-model="isAll" :label="0">否</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- limit 限制单次上传文件的数量，超过这个数量的文件无法上传
drag 允许拖拽上传
action 上传文件的url地址，我这里是根据开发环境还是生产环境动态选择的地址
accept 接受的文件类型，这里控制的是在打开资源器时，显示的可选的文件类型，比如我这里是.der和.cer格式的文件，那么打开资源管理器之后，非der和cer的文件将不会显示
data 上传时可携带的参数，这里后台用map接收
before-upload 上传之前的钩子，可以用来做一些校验
on-success 上传成功之后的钩子，可以用来清除表单校验和文件列表
on-error 上传失败之后的钩子
auto-upload 选择文件之后是否立即上传 -->
    <el-dialog
      class="uploadDialog"
      :title="上传文件"
      :visible.sync="open2"
      width="400px"
      height="500px"
      append-to-body
      @close="cancel2()"
    >
      <el-upload
        class="upload-demo"
        action="UploadUrl()"
        drag
        :file-list="fileList"
        :http-request="uploadFile"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div slot="tip" class="el-upload__tip">只能上传.xlsx、.xls文件了，大小不超过5M</div> -->
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="submitForm">确 定</el-button> -->
        <!-- <el-button @click="cancel2">取 消</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  task_list,
  task_list_add,
  task_list_del,
  task_list_upload
} from '@/api/task/task_list'
import { home_bg } from '@/api/task/home'
import {
  is_admin,
  task_unfinished_forAdmin,
  task_finished_forAdmin
} from '@/api/task/admin'
import { is_finish, task_download } from '@/api/task/task_list'
import {
  logoff, getOnlyUsername
} from '@/api/user'

export default {
  name: 'Dashboard',
  data() {
    return {
      multipleSelection: [],
      usernameData: [],
      isAll: 0,
      fullscreenLoading: false,
      flag: '',
      dialogIndex: '',
      drawerIndex: '',
      dialogVisible: false,
      drawerVisible: false,
      taskUnfinishForAdmin: '',
      taskFinishForAdmin: '',
      id: 0,
      detail: '',
      table: false,
      isFinish: '',
      isAdmin: 1,
      value: false,
      // status 0 登录 1注册
      home_bg: '',
      status: 0,
      Author: '',
      taskname: null,
      tid: null,
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      fileList: [],
      fileList3: [],
      fileData: '',
      open: false,
      adddata: {
        name: null,
        detail: null,
        time: null
      },
      registerForm: {
        username: null,
        password: null,
        Email: null
      },
      list: [
        {
          id: 1,
          created: '2021-10-21T17:01:28',
          updated: '2021-10-05T18:08:53',
          statu: 1,
          name: '测试任务1',
          detail: '任务描述',
          time: 2,
          flag: '0',
          deadline: '2021-10-05T18:10:53',
          deleted: false,
          isFinished: null
        },
        {
          id: 2,
          created: '2021-10-21T17:06:40',
          updated: '2021-10-05T18:08:53',
          statu: 1,
          name: '测试任务2',
          detail: '任务描述',
          time: 2,
          flag: '0',
          deadline: '2021-10-05T18:10:53',
          deleted: false,
          isFinished: null
        },
        {
          id: 34,
          created: '2021-10-30T13:52:07',
          updated: '2021-10-30T13:52:07',
          statu: 0,
          name: '测试任务1044',
          detail: '任务描述',
          time: 1,
          flag: '0',
          deadline: '2021-10-30T13:53:07',
          deleted: false,
          isFinished: null
        },
        {
          id: 34,
          created: '2021-10-30T13:52:07',
          updated: '2021-10-30T13:52:07',
          statu: 0,
          name: '测试任务1044',
          detail: '任务描述',
          time: 1,
          flag: '0',
          deadline: '2021-10-30T13:53:07',
          deleted: false,
          isFinished: null
        },
        {
          id: 34,
          created: '2021-10-30T13:52:07',
          updated: '2021-10-30T13:52:07',
          statu: 0,
          name: '测试任务1044',
          detail: '任务描述',
          time: 1,
          flag: '0',
          deadline: '2021-10-30T13:53:07',
          deleted: false,
          isFinished: null
        },
        {
          id: 34,
          created: '2021-10-30T13:52:07',
          updated: '2021-10-30T13:52:07',
          statu: 0,
          name: '测试任务1044',
          detail: '任务描述',
          time: 1,
          flag: '0',
          deadline: '2021-10-30T13:53:07',
          deleted: false,
          isFinished: null
        },
        {
          id: 34,
          created: '2021-10-30T13:52:07',
          updated: '2021-10-30T13:52:07',
          statu: 0,
          name: '测试任务1044',
          detail: '任务描述',
          time: 1,
          flag: '0',
          deadline: '2021-10-30T13:53:07',
          deleted: false,
          isFinished: null
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    var Author = localStorage.getItem('Authorization')
    // console.log('Author' + Author)
    this.Author = Author
    task_list(Author)
      .then((response) => {
        // console.log(response.result.records)
        this.list = response.result.records
        // console.log(this.list)
      })
      .catch((err) => {
        console.log(err)
      })

    home_bg(Author)
      .then((response) => {
        this.home_bg = response.result
      })
      .catch((err) => {
        console.log(err)
      })
    is_admin(Author)
      .then((response) => {
        // console.log(response.result)
        // console.log(response)
        if (response.result[0] === 'ROLE_admin' || response.result[1] === 'ROLE_admin') this.isAdmin = 1
        else this.isAdmin = 0
        // console.log(this.isAdmin)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    register() {
      this.$router.push({
        path: 'register'
      })
    },
    logoff(Author, username) {
      logoff(Author, username).then((res) => {
        console.log(res)
      })
    },
    getUsername(Author) {
      console.log('获取用户名')
      getOnlyUsername(Author).then((res) => {
        console.log(res.result)
        this.usernameData = res.result
        console.log(this.usernameData)
      })
    },
    open1() {
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },

    open3() {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },

    open4() {
      this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error'
      })
    },
    download(filename, link) {
      const DownloadLink = document.createElement('a')
      DownloadLink.style = 'display: none' // 创建一个隐藏的a标签
      DownloadLink.download = filename
      DownloadLink.href = link
      document.body.appendChild(DownloadLink)
      DownloadLink.click() // 触发a标签的click事件
      document.body.removeChild(DownloadLink)
    },
    openFullScreen() {
      this.loading = this.$loading({
        lock: false,
        text: '莫急 加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    task_file_download(tid) {
      console.log(tid)
      console.log('调用下载任务')
      var Author = localStorage.getItem('Authorization')
      this.openFullScreen()
      task_download(Author, tid).then((response) => {
        console.log('发请求了')
        console.log(response)
        const blob = new Blob([response], { type: 'application/zip' })
        this.loading.close()
        const url = window.URL.createObjectURL(blob)
        console.log(url)
        this.fullscreenLoading = false
        this.download('任务文件.zip', url)
      }).catch(e => {
        console.log(e)
        this.$message.error('下载文件出错')
      })
    },
    UploadUrl() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return ''
    },

    // 下载文件
    // downloadZipFile(val) {
    //   this.tid = val
    //   var Author = this.Author
    //   task_list_download(Author, this.tid)
    //     .then((response) => {
    //       // console.log(response.result.list)
    //       // this.list = response.data.items
    //       // this.list = response.result.list
    //       // console.log(response.message)
    //       if (response.message === '成功!') {
    //         alert('上传成功')
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },

    // 上传前校验
    // beforeUploadFile(file) {
    //   	// 校验仅判断文件类型和文件大小，其他校验规则可以在此方法添加
    //   const fileType = /\.[^\.]+$/.exec(file.name)[0]
    //   const fileSize = file.size / 1024 / 1024
    //   if (!['.xls', '.xlsx'].includes(fileType)) {
    //     this.$message.error('请上传表格文件!')
    //   }
    //   if (fileSize > 50) {
    //     this.$message.error('上传文件大小不能超过50MB!')
    //   }
    // },
    // 上传文件
    uploadFile(e) {
      var tid = this.tid
      var taskname = this.taskname
      console.log('tid:' + tid)
      var Author = this.Author
      var username = localStorage.getItem('username')
      const { file } = e
      try {
        const formData = new FormData()
        formData.append('uploadFile', file)
        this.openFullScreen()
        // 对应的ajax请求不做赘述
        task_list_upload(Author, formData, tid, username, taskname)
          .then((response) => {
            // console.log(response.result.list)
            // this.list = response.data.items
            // this.list = response.result.list
            // console.log(response.message)
            if (response.message === '成功!') {
              this.loading.close()
              this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } catch {
        this.$message.error(e.message)
      }
    },
    getList() {
      var Author = this.Author

      task_list(Author)
        .then((response) => {
          // console.log(response.result.list)
          // this.list = response.data.items
          this.list = response.result.list
        })
        .catch((err) => {
          console.log(err)
        })
    },

    /** 上传按钮操作 */
    handleup(row) {
      this.fileList = []
      const ids = row.id || this.ids
      this.tid = ids
      this.taskname = row.name
      // console.log('taskname:' + this.taskname)
      // console.log('tid ids:' + this.tid)
      this.reset()
      this.open2 = true
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Author = this.Author
      // console.log('Author' + Author)
      const t = this
      const ids = row.id || this.ids
      this.$confirm('是否确认删除编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return task_list_del(Author, ids)
        })
        .then(() => {
          t.$message({
            message: '删除成功',
            type: 'success'
          })
          t.getList()
        })
        .catch(() => {})
    },
    // 添加任务
    submitForm() {
      const t = this
      var Author = this.Author

      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.adddata.isAll)
          task_list_add(
            Author,
            this.adddata.detail,
            this.isAll,
            this.adddata.name,
            this.adddata.time,
          )
            .then((response) => {
              console.log(response.result)
              // this.list = response.data.items
              // this.list = response.result.list
              t.$message({
                message: '添加成功',
                type: 'success'
              })
              this.open = false
              t.getList()
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    submitfile() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('1')
        }
      })
    },
    // 表单重置
    reset() {
      this.adddata = {
        name: null,
        detail: null,
        time: null
      }
      // this.resetForm('form')
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    cancel2() {
      this.open2 = false
      this.reset()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加任务'
    },
    async getFinishedList() {
      this.finishedList = this.finishitableData
    },
    async getUnfinishedList() {
      this.unfinishedList = this.unfinishitableData
    },
    task_detail_common(id) {
      this.Author = localStorage.getItem('Authorization')
      console.log(this.Author)
      is_finish(this.Author, id)
        .then((response) => {
          if (response.result === true) {
            console.log(id + ' 已完成')
            this.flag = '已完成'
          } else {
            console.log(id + ' 未完成')
            this.flag = '未完成'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    task_detail_admin(value) {
      // console.log(value);
      var Author = localStorage.getItem('Authorization')
      task_finished_forAdmin(Author, value)
        .then((response) => {
          // console.log(value)
          // console.log(response.result);
          this.taskFinishForAdmin = response.result.list
        })
        .catch((err) => {
          console.log(err)
        })
      task_unfinished_forAdmin(Author, value)
        .then((response) => {
          this.taskUnfinishForAdmin = response.result.list
        })
        .catch((err) => {
          console.log(err)
        })
    },
    show_drawer(index) {
      this.drawerIndex = index
      this.drawerVisible = true
    },
    show_dialog(index) {
      this.dialogIndex = index
      this.dialogVisible = true
    },
    resetdialog() {
      this.isFinish = ''
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.barBtn{
  display: inline-block;
}
.formTitle {
  font-size: 40px;
  margin-top: 20px;
  margin-left: 10px;
}
.tableTitle {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 10px;
}
.el-form-item {
  margin: 20px 0px 0px 0px;
}
.button_task {
  float: right;
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
  background-size: contain;
  background-position: center;
  display: grid;
  place-items: center;
  padding-top: 8rem;
  position: center;
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
  grid-template-columns: -0.5fr 1fr;
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

.overflowAuto {
  overflow: scroll;
  width: 100%;
  height: 100%;
}

.detail {
  color: #777;
  font-size: 1rem;
  line-height: 1.7;
  padding: 1rem 0;
  margin-left: 15px;
  margin-right: 15px;
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

// .footer .credit{
//     text-transform: capitalize;
//     font-size: 2rem;
//     color:var(--black);
//     padding: 1rem 0;
// }

// .footer .credit span{
//     color:var(--orange);
// }

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

.footer .beian a {
  float: right;
  font-size: 12px;
  text-decoration: none;
  color: #bbb;
}

.footer .follow a:hover {
  background: var(--orange);
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

[v-cloak] {
  display: none !important;
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
