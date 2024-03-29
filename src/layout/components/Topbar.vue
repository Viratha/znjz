<template>
  <div class="top-nav">
    <div class="log">智能基座-Beta2</div>
    <el-menu
      :active-text-color="variables.menuActiveText"
      :default-active="activeMenu"
      mode="horizontal"
      @select="handleSelect"
    >
      <div v-for="item in routes" :key="item.path" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item v-if="!item.hidden" :index="item.path">{{
            item.meta ? item.meta.title : item.children[0].meta.title
          }}</el-menu-item>
        </app-link>
      </div>
    </el-menu>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar"> -->
          <!-- 用户头像上传 -->
          <div class="userAvatar">
            <img :src="imageUrl" class="user-avatar">
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a href="https://github.com/PanJiaChen/vue-admin-template/" target="_blank">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a href="https://panjiachen.github.io/vue-element-admin-site/#/" target="_blank">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided router>
            <span
              style="display: block"
              @click="dialogVisible = true"
            >更换头像</span>
            <el-dialog
              title="头像上传"
              width="400px"
              :visible.sync="dialogVisible"
              :before-close="handleClose"
              append-to-body
              center
            >
              <span
                style="display: block"
              >点击上传用户头像
                <el-upload
                  class="avatar-uploader"
                  action="uploadAvatarAcction()"
                  accept="image/png,image/gif,image/jpg,image/jpeg"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-change="imagesUrl"
                  :http-request="handleAvatar"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </span>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogVisible = false"
                >确 定</el-button>
              </span>
            </el-dialog>
          </el-dropdown-item>

          <el-dropdown-item el-dropdown-item divided><span style="display:block">
            <router-link to="/selfInfo">查看个人信息</router-link>
          </span></el-dropdown-item>

          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppLink from './Sidebar/Link'
import { constantRoutes } from '@/router'
import variables from '@/styles/variables.scss'
import { isExternal } from '@/utils/validate'
import { avatar_upload, user_avatar } from '@/api/user'

export default {
  name: 'Topbar',
  components: {
    AppLink
  },
  data() {
    return {
      routes: constantRoutes,
      dialogVisible: false,
      imageUrl: ''
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      // 如果是首页，首页高亮
      if (path === '/dashboard') {
        return '/'
      }
      // 如果不是首页，高亮一级菜单
      const activeMenu = '/' + path.split('/')[1]
      return activeMenu
    },
    variables() {
      return variables
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters(['avatar'])
  },
  mounted() {
    this.initCurrentRoutes()
    this.initCurrentAvatar()
  },
  methods: {
    addRoute() {
      this.$router.push('/' + 'selfInfo')
    },
    // 通过当前路径找到二级菜单对应项，存到store，用来渲染左侧菜单
    initCurrentRoutes() {
      const { path } = this.$route
      let route = this.routes.find(
        (item) => item.path === '/' + path.split('/')[1]
      )
      // 如果找不到这个路由，说明是首页
      if (!route) {
        route = this.routes.find((item) => item.path === '/')
      }
      this.$store.commit('permission/SET_CURRENT_ROUTES', route)
      this.setSidebarHide(route)
    },
    // 判断该路由是否只有一个子项或者没有子项，如果是，则在一级菜单添加跳转路由
    isOnlyOneChild(item) {
      if (item.children && item.children.length === 1) {
        return true
      }
      return false
    },
    resolvePath(item) {
      // 如果是个完成的url直接返回
      if (isExternal(item.path)) {
        return item.path
      }
      // 如果是首页，就返回重定向路由
      if (item.path === '/') {
        const path = item.redirect
        return path
      }

      // 如果有子项，默认跳转第一个子项路由
      let path = ''
      /**
       * item 路由子项
       * parent 路由父项
       */
      const getDefaultPath = (item, parent) => {
        // 如果path是个外部链接（不建议），直接返回链接，存在个问题：如果是外部链接点击跳转后当前页内容还是上一个路由内容
        if (isExternal(item.path)) {
          path = item.path
          return
        }
        // 第一次需要父项路由拼接，所以只是第一个传parent
        if (parent) {
          path += parent.path + '/' + item.path
        } else {
          path += '/' + item.path
        }
        // 如果还有子项，继续递归
        if (item.children) {
          getDefaultPath(item.children[0])
        }
      }

      if (item.children) {
        getDefaultPath(item.children[0], item)
        return path
      }

      return item.path
    },
    handleSelect(key, keyPath) {
      // 把选中路由的子路由保存store
      const route = this.routes.find((item) => item.path === key)
      this.$store.commit('permission/SET_CURRENT_ROUTES', route)
      this.setSidebarHide(route)
    },
    // 设置侧边栏的显示和隐藏
    setSidebarHide(route) {
      if (!route.children || route.children.length === 1) {
        this.$store.dispatch('app/toggleSideBarHide', true)
      } else {
        this.$store.dispatch('app/toggleSideBarHide', false)
      }
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      localStorage.setItem('Author', '')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 用户头像更改
    uploadAvatarAcction() {
      return ''
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 头像图片显示
    imagesUrl(event) {
      console.log(event)
      this.imageUrl = window.URL.createObjectURL(event.raw)
    },
    // 上传头像文件
    handleAvatar(f) {
      var Author = localStorage.getItem('Authorization')
      const { file } = f
      try {
        const formData = new FormData()
        formData.append('uploadFile', file)
        console.log('---------上传文件---------')
        avatar_upload(Author, formData)
          .then((response) => {
            if (response.message === '成功!') {
              alert('上传成功')
              // location.reload();
            }
          })
          .catch((err) => {
            console.log(err)
          })
        console.log('-------------------------')
      } catch {
        this.$message.error(f.message)
      }
    },
    handleClose() {
      location.reload()
    },
    initCurrentAvatar() {
      var Author = localStorage.getItem('Authorization')
      user_avatar(Author).then(response => {
        // console.log(response.result.avatar)
        if (response.result.avatar) {
          console.log(response)
          this.imageUrl = response.result.avatar
        } else {
          this.imageUrl = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userAvatar {
  width: 40px;
  height: 40px;
  border-radius: 24%;
  background-color: #d9d9d9;
}
/deep/.el-dialog__body {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
