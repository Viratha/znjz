<template>
  <div class="main">
    <!-- <table>
      <th colspan="2">个人信息</th>
      <tr><td> <span class="el-icon-user" /> 用户名：</td><td> {{ username }}</td></tr>
      <tr><td><span class="el-icon-video-play" /> 创建时间：</td><td> {{ createdTime }}</td></tr>
      <tr><td><span class="el-icon-s-opportunity" /> 方向：</td><td> {{ direction }}</td></tr>
      <tr><td><span class="el-icon-message" /> 邮箱：</td><td> {{ email }}</td></tr>
      <tr><td><span class="el-icon-bell" /> 剩余违规次数：</td><td> {{ deadcount }}</td></tr>

    </table> -->
    <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size" border>
      <!-- <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template> -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          用户名
        </template>
        {{ username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone" />
          创建时间
        </template>
        {{ createdTime }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline" />
          邮箱
        </template>
        {{ email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline" />
          剩余违规次数
        </template>
        {{ deadcount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets" />
          方向
        </template>
        <el-tag size="small">{{ direction }}</el-tag>
      </el-descriptions-item>

    </el-descriptions>
    <p class="warm">注意事项：</p>
    <p class="attention">
      剩余违规次数，会在未完成任务，或者违反其它规定时候扣除，当次数扣完的时候，系统会自动发起警告，如果之后仍然还是出现违纪行为，就会被社团开除。
      此项工作由系统自动完成，人工无法干预</p>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selfInfo } from '@/api/task/selfInfo'
export default {
  name: 'SelfInfo',
  data() {
    return {
      Author: '',
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
          case 6 : this.direction = '考研内卷组'; break
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

.main{
  margin: 100px;
}
.title {
  font-size: 16px;
}
.warm {
  color: red;
}
.attention{
  font-size: 14px;
  color: #696c74;
  width: 80%;
  margin: auto;
  margin-top: 15px;
}
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
padding-left: 10px;
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
