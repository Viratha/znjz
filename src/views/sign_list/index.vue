<template>
  <div class="sign_list">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </div>
</template>

<script>
// import { sign_list } from '@vue/task/sign_list'

// export default ({
//   name: 'Dashboard',
//   data() {
//     return {
//       Author: null,
//       finishitableData: [],
//       unfinishitableData: [],
//       tableData: [{
//         date: '2016-05-02',
//         name: '王小虎',
//         address: '上海市普陀区金沙江路 1518 弄'
//       }, {
//         date: '2016-05-04',
//         name: '王小虎',
//         address: '上海市普陀区金沙江路 1518 弄'
//       }, {
//         date: '2016-05-01',
//         name: '王小虎',
//         address: '上海市普陀区金沙江路 1518 弄'
//       }, {
//         date: '2016-05-03',
//         name: '王小虎',
//         address: '上海市普陀区金沙江路 1518 弄'
//       }]
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'name'
//     ])
//   },
//   created() {
//     var Author = localStorage.getItem('Authorization')
//     // var reg = new RegExp('"', 'g')
//     // Author = Author.replace(reg, '')
//     // console.log('Author' + Author)
//     this.Author = Author
//     // console.log('hehe' + Authorization)
//     // const t = this
//     task_list_finished(Author).then(response => {
//       // console.log(response.result.list)
//       // this.list = response.data.items
//       this.finishitableData = response.result.list
//       // console.log(this.finishitableData)
//     }).catch((err) => {
//       console.log(err)
//     })
//     task_list_unfinished(Author).then(response => {
//       // console.log(response.result.list)
//       this.unfinishitableData = response.result.list

//       // this.list = response.data.items
//     }).catch((err) => {
//       console.log(err)
//     })
//   },
//   methods: {

//     tableRowClassName({ row, rowIndex }) {
//       if (rowIndex === 1) {
//         return 'warning-row'
//       } else if (rowIndex === 3) {
//         return 'success-row'
//       }
//       return ''
//     }
//   }
// })
</script>

<style lang="scss" scoped>

</style>
