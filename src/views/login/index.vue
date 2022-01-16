<template>
  <div class="login-container">
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left"> -->
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div v-if="status==0">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <div class="code">
          <div class="codema">
            <el-form-item prop="code">
              <el-input
                ref="username"
                v-model="loginForm.code"
                placeholder="验证码"
                name="code"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
          </div>

          <p class="pic">
            <img id="image" src="./code.jpg" height="45" width="150" style="cursor:pointer" @click="imgclick()">

          </p>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
          <el-button style="margin-bottom:30px;float:right" @click.native.prevent="handleregisterchange">我要注册</el-button>

        </div>

      </div>

      <div v-if="status==1">
        <div class="title-container">
          <h3 class="title">注册</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleregister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="Email">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="Email"
            v-model="registerForm.Email"
            placeholder="邮箱"
            name="Email"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleregister">注册</el-button>
        <el-button style="margin-bottom:30px;float:right" @click="Loginchange">登录</el-button>

      </div>

      <!-- <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleregister">注册</el-button> -->

      <div class="tips">
        <!-- <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span> -->
        <span> 多喝热水</span>
        <a href="https://beian.miit.gov.cn/" target="_blank">桂ICP备2021009535号</a>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { code } from '@/api/task/login'
import { register } from '@/api/task/register'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: null,
        password: null,
        Email: null
      },
      // status0为登录 1注册
      status: 0,
      loginForm: {
        // username: 'admin',
        // password: '111111',
        username: null,
        password: null,
        code: null,
        token: null
      },
      loginForm_fa: {
        // username: 'admin',
        // password: '111111',
        username: 'admin',
        password: '111111',
        code: 0,
        token: 'aaaaa'
      },
      loginForm_old: {
        username: 'admin2',
        password: '1'

      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
      // localStorage.setItem('countcount', 1)
      // var countcount = localStorage.getItem('countcount')
      // console.log('countcount：' + countcount)
      const t = this
      code().then(response => {
      // console.log(response.result.token)
        t.loginForm.token = response.result.token
        var obj = document.getElementById('image')
        obj.src = response.result.captchaImg
      // this.list = response.data.items
      // this.listLoading = false
      })

    // const t = this
    // code().then(response => {
    //   // console.log(response.result.token)
    //   t.loginForm.token = response.result.token
    //   var obj = document.getElementById('image')
    //   obj.src = response.result.captchaImg
    //   // this.list = response.data.items
    //   // this.listLoading = false
    // })

    //   // 在页面加载时读取sessionStorage里的状态信息
    //   if (sessionStorage.getItem('store')) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    //   }

  //   // 在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener('beforeunload', () => {
  //     sessionStorage.setItem('store', JSON.stringify(this.$store.state))
  //   })
  },

  methods: {
    imgclick() {
      // localStorage.setItem('countcount', 1)
      // var countcount = localStorage.getItem('countcount')
      // console.log('countcount：' + countcount)
      const t = this
      code().then(response => {
      // console.log(response.result.token)
        t.loginForm.token = response.result.token
        var obj = document.getElementById('image')
        obj.src = response.result.captchaImg
      // this.list = response.data.items
      // this.listLoading = false
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      localStorage.setItem('count', 1)
      // const t = this
      // code().then(response => {
      //   t.loginForm.token = response.result.token
      //   var obj = document.getElementById('image')
      //   obj.src = response.result.captchaImg
      // })
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          // this.$store.dispatch('user/login_new', this.loginForm).then(response => {
          //   alert(response)
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })

          this.loading = true
          // console.log('this form' + JSON.stringify(this.loginForm))
          this.$store.dispatch('user/login_new', this.loginForm).then(response => {
            // alert('response code' + response.code)
            // if (response.code === 200) {
            // this.$message.success(response.message)
            localStorage.setItem('username', this.loginForm.username)
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
            // }
          }).catch(() => {
            this.loading = false
            // this.$router.push({ path: this.redirect || '/' })
            // this.$message.error('登录失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Loginchange() {
      this.status = 0
      this.loginForm.username = null
      this.loginForm.password = null
      this.loginForm.code = null
    },
    handleregisterchange() {
      this.status = 1
      this.registerForm.username = null
      this.registerForm.password = null
      this.registerForm.Email = null
    },
    handleregister() {
      // this.$router.push({ path: '/register' })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.$store.dispatch('user/login_new', this.loginForm_fa).then(response => {
      //     // this.$store.dispatch().then(() => {
      //       this.$router.push({ path: '/register' })
      //     }).catch(() => {
      //       console.log('error submit!!')
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      // ——————
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.loginForm_old.code = this.loginForm.code
      //     this.loginForm_old.token = this.loginForm.token
      //     console.log('this form' + JSON.stringify(this.loginForm))
      //     this.$store.dispatch('user/login_new', this.loginForm_old).then(response => {
      //       // this.$message.error(response.message)
      //       // alert('response.message' + response)
      //       // if (response.message === '成功!') {
      //       this.$router.push({ path: this.redirect || '/' })
      //       this.loading = false
      //       // }
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      // ——————
      const t = this
      // console.log(this.registerForm.username)
      // console.log(this.registerForm.password)
      // console.log(this.registerForm.Email)
      this.loading = true

      register(t.registerForm.username, t.registerForm.password, t.registerForm.Email).then(response => {
        // console.log(response.message)
        if (response.message === '成功!') {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          // t.$router.push({ path: '/login' })
          this.status = 0
          this.loading = false
        } else {
          this.$message.error(response.message)
          this.loading = false
        }
        // this.list = response.data.items
      }).catch((err) => {
        console.log(err)
        this.$message.error('注册失败，已存在用户名')
        this.loading = false
      })

      // this.$store.dispatch('user/login', this.registerForm).then(() => {
      //   this.$router.push({ path: this.redirect || '/login' })
      //   this.loading = false
      // }).catch(() => {
      //   this.loading = false
      // })
      // this.$refs.registerForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true

      //     register(t.registerForm.username, t.registerForm.password, t.registerForm.Email).then(response => {
      //       // console.log(response.message)
      //       if (response.message === '成功!') {
      //         this.$message({
      //           message: '注册成功',
      //           type: 'success'
      //         })
      //         // t.$router.push({ path: '/login' })
      //         this.status = 0
      //         this.loading = false
      //       } else {
      //         this.$message.error(response.message)
      //         this.loading = false
      //       }
      //       // this.list = response.data.items
      //     }).catch((err) => {
      //       console.log(err)
      //       this.$message.error('注册失败，已存在用户名')
      //       this.loading = false
      //     })

      //     // this.$store.dispatch('user/login', this.registerForm).then(() => {
      //     //   this.$router.push({ path: this.redirect || '/login' })
      //     //   this.loading = false
      //     // }).catch(() => {
      //     //   this.loading = false
      //     // })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.code{
   margin: 0px 0px 0px 0px;

}
.codema{
    margin: 0px 0px 20px 0px;
    height: 20px;
    width: 250px;
    float: right;
}
 .pic {
   margin: 0px 0px 20px 0px;
      float: left;
      text-align: center;
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
