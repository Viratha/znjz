<template>
  <!-- 签到签退按钮 -->
  <div class="sign">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="func" style="text-align:center;">
          <el-row>
            <el-button round icon="el-icon-smoking" @click="sign_in">
              签到
            </el-button>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="func" style="text-align:center;">
          <el-button round icon="el-icon-no-smoking" @click="sign_out">
            签退
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-divider />
    <!-- 签到信息 -->
    <div class="sign_list">
      <div>
        <h3 class="title">我的签到信息 </h3>

        <el-table
          :data="signMyselfData"
          :header-row-class-name="tableRowClassName"
          border
          stripe
          height="100px"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          max-height="300"
        >
          <el-table-column
            header-align="center"
            width="100px"
            align="center"
            type="index"
            label="序号"
          />
          <el-table-column prop="username" label="姓名" width="300px" />
          <!-- 以小时分钟为单位 -->
          <el-table-column prop="time" label="已签到时间" width="300px" />
          <el-table-column
            prop="statu"
            label="签到状态"
            :formatter="stateFormat"
          >
            <!-- <template slot-scope="scope"> -->
            <!-- scope.row 包含表格里当前行的所有数据 -->
            <span
              v-if="this.statu === 1"
              style="color: green"
            >上班中</span>
            <span
              v-if="this.statu === 0"
              style="color: red"
            >下班辽</span>
            <!-- </template> -->
          </el-table-column>
        </el-table>
      </div>

      <div>
        <h3 class="title">签到排行</h3>

        <el-table
          :data="
            tableData
          "
          border
          stripe
          height="500px"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            header-align="center"
            width="100px"
            align="center"
            type="index"
            :index="xuhao"
            label="序号"
          />
          <el-table-column prop="username" label="姓名" width="300px" />
          <!-- 以小时分钟为单位 -->
          <el-table-column prop="time" label="已签到时间" width="300px" />
          <el-table-column
            prop="statu"
            label="签到状态"
            width="300px"
            :formatter="stateFormat"
          >
            <template slot-scope="scope">
              <!-- scope.row 包含表格里当前行的所有数据 -->
              <span
                v-if="scope.row.statu === 1"
                style="color: green"
              >上班中</span>
              <span
                v-if="scope.row.statu === 0"
                style="color: red"
              >下班辽</span>
            </template>
          </el-table-column>
          <el-table-column label="举报按钮">
            <template slot-scope="scope">
              <el-button
                type="text"
                width="50%"
                @click="jubao(scope.row.username)"
              >举报</el-button>
            </template>

          </el-table-column>
          <div class="block" />
        </el-table>
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-size="this.pagesize"
            :page-sizes="this.pagesizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.signData.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sign, signout } from '@/api/task/sign_list'
import { sign_list, sign_list_myself } from '@/api/task/sign_list'
import { report } from '@/api/task/report'
// import { selfInfo } from '@/api/task/selfInfo'
export default {
  name: 'Sign',
  data() {
    return {
      currentPage: 1,
      total: 0,
      pagesize: 20,
      pagesizes: [20, 40, 50],
      statu: 3,
      signData: [],
      signMyselfData: [],
      signList: null
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    var Author = localStorage.getItem('Authorization')
    this.Author = Author
    var username = localStorage.getItem('username')
    this.username = username
    console.log(Author)
    sign_list_myself(Author, username)
      .then((response) => {
        this.signMyselfData = response.result
        this.statu = response.result[0].statu
        console.log(this.signMyselfData)
      })
      .catch((err) => {
        console.log(err)
      })

    sign_list(Author)
      .then((response) => {
        this.signData = response.result
        this.total = this.signData.length
        this.getSignList()
      })
      .catch((err) => {
        console.log(err)
      })
  },

  methods: {
    xuhao(index) {
      // 当前页数 - 1 * 每页数据条数 + 1
      const xuhao = (this.currentPage - 1) * this.pagesize + 1 + index
      return xuhao
    },
    async getSignList() {
      for (let i = 0; i < this.pagesize; i++) {
        this.tableData = this.signData.slice(this.pagesize * (this.currentPage - 1), this.pagesize * this.currentPage)
      }
    },
    // 重新获取数据
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSignList()
    },
    jubao(username) {
      this.$confirm('举报成功后举报立刻生效，举报信息会加入数据库，等待管理员核查。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.report_btn(username)) {
          this.open2('举报成功')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消举报'
        })
      })
    },
    refresh() {
      var Author = localStorage.getItem('Authorization')
      this.Author = Author
      var username = localStorage.getItem('username')
      this.username = username
      console.log(this.statu)
      if (this.statu === 1) {
        console.log('执行了')
        signout(Author, username)
          .then((response) => {
            sign(Author, username)
              .then((response) => {
                console.log(response.result)
                location.reload(true)
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    stateFormat(row, column) {
      if (row.statu === 1) {
        return '上班'
      } else {
        return '下班'
      }
    },
    open2(mes) {
      this.$message({
        message: mes,
        type: 'success'
      })
    },
    open4(mes) {
      this.$message.error(mes)
    },
    sign_in() {
      var t = this
      var Author = localStorage.getItem('Authorization')
      this.Author = Author
      var username = localStorage.getItem('username')
      this.username = username
      sign(Author, username)
        .then((response) => {
          if (response.result === true) {
            this.$set(this, 'statu', 1)
            location.reload(true)
            t.open2()
          } else {
            t.open4()
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.$forceUpdate()
    },

    sign_out() {
      var Author = localStorage.getItem('Authorization')
      this.Author = Author
      var username = localStorage.getItem('username')
      this.username = username
      signout(Author, username)
        .then((response) => {
          //   this.unfinishitableData = response.result.list
          if (response.result === true) {
            // this.statu = 0
            this.$set(this, 'statu', 0)
            location.reload(true)
            // this.$forceUpdate()
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
          } else {
            this.$message.error('别点了，成功了')
          }
          // this.list = response.data.items
        })
        .catch((err) => {
          console.log(err)
        })
      this.$forceUpdate()
    },
    report_btn(reportUsername) {
      var t = this
      var username = reportUsername
      console.log(username)
      var Author = localStorage.getItem('Authorization')
      report(Author, username)
        .then((response) => {
          console.log(response.result)
          if (response.result === true) {
            t.open2('举报成功')
          } else if (response.result === null) {
            t.open4('该用户已经签退，请签到之后重试')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sign {
  max-width: 80%;
  max-height: 1200px;
  margin: 0 auto;
  margin-bottom: 100px
}
.func {
  margin-top: 30px;
  margin-left: 30px;
}

.title {
  display: block;
  margin-top: 30px;
  margin-left: 30px;
  color: #909399;
}
</style>

