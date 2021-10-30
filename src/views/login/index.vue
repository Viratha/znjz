<template>
  <div class="login-container">
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left"> -->
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">

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
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <el-button style="margin-bottom:30px;float:right" @click="handleregister">注册</el-button>
      <!-- <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleregister">注册</el-button> -->

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { code, login_new } from '@/api/task/login'

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
      loginForm: {
        username: 'admin',
        password: '111111',
        code: null,
        token: null
      },
      loginForm_old: {
        username: 'admin',
        password: '111111'
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
    // const t = this
    // code().then(response => {
    //   // console.log(response.result.token)
    //   t.loginForm.token = response.result.token
    //   var obj = document.getElementById('image')
    //   obj.src = response.result.captchaImg
    //   // this.list = response.data.items
    //   // this.listLoading = false
    // })
  },
  methods: {
    imgclick() {
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
      const t = this
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
          login_new(this.loginForm).then(response => {
            // console.log(response.message)
            if (response.message === '成功!') {
              t.$message({
                message: '登录成功',
                type: 'success'
              })
              console.log(response.headers)

              this.$store.dispatch('user/login', this.loginForm_old).then(() => {
                this.$router.push({ path: '/' })
              }).catch(() => {
                console.log('error submit!!')
              })

              this.loading = false
            } else {
              this.$message.error(response.message)
              this.loading = false
            }
            // this.list = response.data.items
          }).catch((err) => {
            console.log(err)
            this.$message.error('登录失败')
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleregister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm_old).then(() => {
            this.$router.push({ path: '/register' })
          }).catch(() => {
            console.log('error submit!!')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
