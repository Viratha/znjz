<template>
  <div class="vote" :style="{background:bg}">
    <div class="vote_wrap">
      <voteBox title="我要竞选" @click.native="dialog1Visible = true" />
      <voteBox title="我要投票" @click.native="dialog3Visible = true , findList()" />
      <!-- <voteBox title="搜索竞选人" @click.native="dialog4Visible = true" /> -->
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialog1Visible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
      :lock-scroll="false"
    >
      <span>{{ username }},您确定参与竞选？</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1Visible = false">取 消</el-button>
        <el-button type="primary" @click="addvoter(username)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="竞选名单" :visible.sync="dialog3Visible" width="600px" :lock-scroll="false">
      <el-table :data="gridData" style="width: 100%; justify-content: center;">
        <el-table-column property="id" label="id" width="150px" />
        <el-table-column property="vname" label="姓名" width="200px" />
        <el-table-column property="vnums" label="投票数" />
        <el-table-column label="投票" width="150px">
          <template slot-scope="scope">
            <el-button type="plain" icon="el-icon-thumb" @click="vote(scope.row.vname)">投票</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialog4Visible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
      :lock-scroll="false"
    >
      <el-input v-model="searchInput" placeholder="请输入您要搜索的竞选人" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog4Visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog4Visible = false; count(searchInput)">确 定</el-button>
      </span>
    </el-dialog> -->

    <el-dialog title="竞选名单" :visible.sync="dialog5Visible" width="600px" :lock-scroll="false">
      <el-table :data="voterData" style="width: 100%">
        <el-table-column property="id" label="id" width="150px" />
        <el-table-column property="vname" label="姓名" width="200px" />
        <el-table-column label="投票数" width="150px"> {{ nums == null ? 0 : nums }} </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import voteBox from '../../components/voteBox'
import { findList, vote, voter, count } from '@/api/task/vote'
export default {
  components: { voteBox },
  data() {
    return {
      searchInput: '',
      inputValue: '',
      Authorization: '',
      voterData: [],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄' }],
      dialog1Visible: false,
      dialog2Visible: false,
      dialog3Visible: false,
      dialog4Visible: false,
      dialog5Visible: false,
      username: localStorage.getItem('username')

    }
  },
  computed: {
    ...mapGetters(['name'])
  },

  created() {
    var Author = localStorage.getItem('Authorization')
    localStorage.setItem('Author', Author)
    localStorage.setItem('Authorization', Author)
    this.bg = 'url(' + 'http://47.93.33.180:9000/login/006WYq6ngy1gy8gnqm4dfj33y82807wh.jpg' + ')'
    this.findList()
  },
  methods: {
    getURL(picture) {
      if (picture == null) picture = 'http://47.93.33.180:9000/taskmanagement/avatar/2100720205蒋锋.jpeg'
      console.log(picture)
      return window.URL.createObjectURL(picture)
    },
    change() {
      console.log('出发了')
    },
    handleClose(done) {
      done()
    },
    vote(alternativeName) {
      var Author = localStorage.getItem('Authorization')
      var username = localStorage.getItem('username')
      if (alternativeName === '' || alternativeName === null) {
        this.$message({
          message: '输入框不能为空',
          type: 'error'
        })
        return
      }
      vote(Author, alternativeName, username).then((response) => {
        this.$message({
          message: '投票成功',
          type: 'success'
        })
        this.count(alternativeName)
        this.findList()
        console.log(response)
      })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: '请勿重复投票同一人',
            type: 'error'
          })
        })
    },
    addvoter(alternativeName) {
      this.dialog1Visible = false
      var Author = localStorage.getItem('Authorization')
      console.log('添加竞选')
      voter(Author, alternativeName).then((response) => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        console.log(response)
      })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: '请勿重复添加',
            type: 'error'
          })
        })
    },
    count(alternativeName) {
      var Author = localStorage.getItem('Author')
      count(Author, alternativeName).then((response) => {
        console.log(response.result)
        localStorage.setItem('Authorization', Author)
        this.voterData = response.result
      })
        .catch((err) => {
          console.log(err)
        })
    },
    findList() {
      var Author = localStorage.getItem('Author')
      findList(Author).then((response) => {
        console.log(response.result)
        localStorage.setItem('Authorization', Author)
        this.gridData = response.result
      })
        .catch((err) => {
          console.log(err)
        })
    }
  }

}
</script>

<style lang="scss" scoped>
  html,body{
    margin:0;
    padding:0;
  }

  .vote{
	// width:100vw;
	height:100vh;
  overflow: hidden;
    .vote_wrap{
      height: 100px;
      width: 100%;
      min-width: 200px;
      min-height: 100px;
      margin:100px 0;
      tab-size: 16px;
      line-height: 16px;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      overflow: hidden;
      }

    }

</style>
