<template>
  <div class="main">
    <table>
      <th colspan="2">个人信息</th>
      <tr><td> <span class="el-icon-user" /> 用户名：</td><td>{{ username }}</td></tr>
      <tr><td><span class="el-icon-video-play" /> 创建时间：</td><td>{{ createdTime }}</td></tr>
      <tr><td><span class="el-icon-s-opportunity" /> 方向：</td><td>{{ direction }}</td></tr>
      <tr><td><span class="el-icon-message" /> 邮箱：</td><td>{{ email }}</td></tr>
      <tr><td><span class="el-icon-bell" /> 剩余违规次数：</td><td>{{ deadcount }}</td></tr>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selfInfo } from '@/api/task/selfInfo'
export default {
  name: 'SelfInfo',
  data(Author) {
    return {
      Author: Author,
      username: null,
      createdTime: null,
      directionId: null,
      direction: '',
      email: null,
      deadcount: null
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  watch: {
    directionId: {
      immediate: true,
      handler(val) {
        switch (val) {
          case 1 : this.direction = '华为云/后端'; break
          case 2 : this.direction = '华为云/前端'; break
          case 3 : this.direction = '鸿蒙/软件'; break
          case 4 : this.direction = '鸿蒙/硬件'; break
          case 5 : this.direction = '昇腾'; break
          default :this.direction = 'null'
        }
      }
    }
  },
  created() {
    var Author = localStorage.getItem('Authorization')
    this.Author = Author
    selfInfo(Author).then((response) => {
      var result = response.result
      this.username = result.username
      this.email = result.email
      this.createdTime = result.created
      this.deadcount = result.deadcount
      this.directionId = result.directionId
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
    table {
      width: 70%;
      background: #ccc;
      margin: 20px auto;
      border-collapse: collapse;

}

th,td {

border: 1px solid #ccc;
box-sizing: border-box;
overflow: hidden;
text-overflow: ellipsis;
white-space: normal;
word-break: break-all;
line-height: 30px;
padding-right: 10px;
color: #696c74;

}

th {
background: #eee;
}

tr {

background: #fff;
margin: 20px;
}

tr:hover {

background: #c3c5c7;

}

td a {

color: #06f;

text-decoration: none;

}

td a:hover {

color: #06f;

text-decoration: underline;

}
</style>
