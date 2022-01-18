<template>
  <!-- 签到签退按钮 -->
  <div class="sign">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="func">
          <el-row>
            <el-button round icon="el-icon-smoking" @click="sign_in">
              签到
            </el-button>
          </el-row>
        </div></el-col>
      <el-col :span="6">
        <div class="func">
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
        <h3 class="title">我的签到信息 <span class="el-icon-refresh-right" @click="refresh" /> </h3>

        <el-table
          :data="signMyselfData"
          :header-row-class-name="tableRowClassName"
          border
          stripe
          height="150px"
          style="width: 100%"
          :row-class-name="tableRowClassName"
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
          :data="signData"
          border
          stripe
          height="1300px"
          style="width: 100%"
          :row-class-name="tableRowClassName"
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
          <el-table-column label="举报按钮" width="300px">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="report_btn(scope.row.username)"
              >举报</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  data(Author, username) {
    return {
      Author: Author,
      username: username,
      statu: 3,
      signData: [],
      signMyselfData: []
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
        console.log('================')
        console.log(response.result)
        this.signMyselfData = response.result
        console.log(response.result[0].statu)
        this.statu = response.result[0].statu
      })
      .catch((err) => {
        console.log(err)
      })

    sign_list(Author)
      .then((response) => {
        console.log(response.result)
        this.signData = response.result
      })
      .catch((err) => {
        console.log(err)
      })

    // selfInfo(Author).then((response) => {
    //   this.statu = response.result.statu
    // }).catch((err) => {
    //   console.log(err)
    // })
  },
  methods: {
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
                this.$forceUpdate()
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
    open2() {
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
    },
    open4() {
      this.$message.error('别点了，成功了')
    },
    sign_in() {
      var t = this
      var Author = localStorage.getItem('Authorization')
      this.Author = Author
      var username = localStorage.getItem('username')
      this.username = username
      sign(Author, username)
        .then((response) => {
          console.log(response.result)
          if (response.result === true) {
            this.$set(this, 'statu', 1)
            // this.statu = 1
            // this.$forceUpdate()
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
          console.log(response.result)
          //   this.unfinishitableData = response.result.list
          if (response.result === true) {
            this.statu = 0
            this.$forceUpdate()
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
    report_btn(Username) {
      var t = this
      var username = Username
      console.log(username)
      var Author = localStorage.getItem('Authorization')
      report(Author, username)
        .then((response) => {
          console.log(response.result)
          if (response.result === true) {
            t.open2()
          } else {
            t.open4()
          }
        })
        .catch((err) => {
          console.log(err)
          // this.$message.error("别点了，已经举报成功啦");
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
}
.func {
  margin-top: 30px;
  margin-left: 30px;
}

.title {
  margin-top: 30px;
  margin-left: 30px;
  color: #909399;
}
</style>

