<template>
  <!-- 签到签退按钮 -->
  <div class="sign">
    <el-row :gutter="20">
      <el-col :span="6"><div class="func"><el-row>
        <el-button round icon="el-icon-smoking" @click="sign_in"> 签到</el-button>
      </el-row></div></el-col>
      <el-col :span="6"><div class="func"><el-button round icon="el-icon-no-smoking" @click="sign_out"> 签退</el-button></div></el-col>
    </el-row>

    <el-divider />
    <!-- 签到信息 -->
    <div class="sign_list">

      <div>
        <h3 class="title">
          我的签到信息
        </h3>
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
          <el-table-column
            prop="username"
            label="姓名"
            width="300px"
          />
          <!-- 以小时分钟为单位 -->
          <el-table-column
            prop="time"
            label="已签到时间"
          />
        </el-table>
      </div>

      <div>
        <h3 class="title">
          签到排行
        </h3>
        <el-table
          :data="signData"
          border
          stripe
          height="1200px"
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
          <el-table-column
            prop="username"
            label="姓名"
            width="300px"
          />
          <!-- 以小时分钟为单位 -->
          <el-table-column
            prop="time"
            label="已签到时间"
          />
        </el-table>
      </div>
    <!-- <template slot-scope="scope">
      <el-switch v-model="scope.row.mg_state" @change="userstateChange(scope.row.username)" />
    </template> -->

    </div>
  </div></template>

<script>
import { mapGetters } from 'vuex'
import { sign, signout } from '@/api/task/sign_list'
import { sign_list, sign_list_myself } from '@/api/task/sign_list'

export default {
  name: 'Sign',
  data(Author, username) {
    return {
      Author: Author,
      username: username,

      signData: []

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    var Author = localStorage.getItem('Authorization')
    this.Author = Author
    var username = localStorage.getItem('username')
    this.username = username
    sign_list_myself(Author, username).then(response => {
      console.log('================')
      console.log(response.result)
      this.signMyselfData = response.result
    }).catch((err) => {
      console.log(err)
    })

    sign_list(Author).then(response => {
      console.log(response.result)
      this.signData = response.result
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {

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
      sign(Author, username).then(response => {
        console.log(response.result)
        //   this.unfinishitableData = response.result.list
        if (response.result === true) {
          t.open2()
        } else {
          t.open4()
        }

      // this.list = response.data.items
      }).catch((err) => {
        console.log(err)
      })
    },

    sign_out() {
      var t = this
      var Author = localStorage.getItem('Authorization')
      this.Author = Author
      var username = localStorage.getItem('username')
      this.username = username
      signout(Author, username).then(response => {
        console.log(response.result)
        //   this.unfinishitableData = response.result.list
        if (response.result === true) {
          t.open2()
        } else {
          t.open4()
        }
      // this.list = response.data.items
      }).catch((err) => {
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

      }
      .func {
        margin-top: 30px;
        margin-left: 30px;
      }

      .title{
        margin-top: 30px;
        margin-left: 30px;
        color: #909399;
      }
</style>
