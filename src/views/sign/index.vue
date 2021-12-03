<template>
  <div class="sign">
    <el-row :gutter="20">
      <el-col :span="6"><div class="qiandao"><el-row>
        <el-button round @click="sign_in">签到</el-button>

      </el-row></div></el-col>
      <el-col :span="6"><div class="qiantui"><el-button round @click="sign_out">签退</el-button></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sign, signout } from '@/api/task/sign_list'

export default {
  name: 'Sign',
  data(Author, username) {
    return {
      Author: Author,
      username: username
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {

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
    }
  }

}
</script>

<style lang="scss" scoped>
      .sign {

      }
      .qiandao {

      }
      .qiantui{

      }
</style>
