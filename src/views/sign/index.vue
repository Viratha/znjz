<template>
  <div class="sign">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"><el-row>
        <el-button round @click="sign_in">签到</el-button>

      </el-row></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"><el-button round @click="sign_out">签退</el-button></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sign, signout } from '@/api/task/sign_list'

export default {
  name: 'Sign',
  data() {
    return {
      Author: null,
      username: null
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
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },
    open4() {
      this.$message.error('错了哦，这是一条错误消息')
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

</style>
