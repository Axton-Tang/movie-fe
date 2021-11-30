<template>
  <div>
    <Header class="header" />
    <div class="content-wrapper">
      <div class="back">
        <img class="img" src="../assets/back-img.png">
      </div>
      <div class="content">
        <div class="title">{{state}}账号</div>
        <div class="user"><label>用户：<label/></label><input class="inp" type="text" v-model="username"></div>
        <div class="password"><label>密码：<label/></label><input class="inp" type="password" v-model="password"></div>
        <div class="handle">
          <div class="login" @click="handleLoginOrRegister">{{state}}</div>
          <div class="register" @click="handleSwitch">{{state === "登录" ? "注册" : "登录"}}账号</div>
        </div>
      </div>
    </div>
    <Pop v-if="showLoginFail" msg="密码或账号错误" :status=false />
    <Pop v-if="showRegisterSuccess" msg="注册成功" :status=true />
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import Pop from './Pop.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Pop
  },
  data() {
    return {
      state: '登录',
      username: '',
      password: '',
      showLoginFail: false,
      showRegisterSuccess: false
    }
  },
  methods: {
    handleLoginOrRegister() {
      if (this.state === '登录') {
        axios.post('/api/login', {
          username: this.username,
          pwd: this.password
        }).then(res => {
          if (res && res.data && res.data.status === 'success') {
            this.username = '';
            this.password = '';
            sessionStorage.setItem("movie-userId", res.data.data.userid);
            this.$router.push('/home');
          } else {
            this.showLoginFail = true;
            setTimeout(() => {
              this.showLoginFail = false;
            }, 2000)
          }
        })
      } else {
        axios.post('/api/register', {
          username: this.username,
          pwd: this.password
        }).then(res => {
          if (res && res.data && res.data.status === 'success') {
            this.state = '登录'
            this.username = '';
            this.password = '';
            this.showRegisterSuccess = true;
            setTimeout(() => {
              this.showRegisterSuccess = false;
            }, 2000)
          }
        })
      }
    },
    handleSwitch() {
      if (this.state === '登录') {
        this.state = '注册'
      } else {
        this.state = '登录'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-wrapper
  position relative
  .back
    position relative
    top: 64px
    .img
      width: 100%
      height: 100%
  .content
    position: absolute
    top: 60%
    left: 50%
    transform: translate(-50%, -50%)
    width: 500px
    height: 400px
    background-color: rgba(255, 255, 255, 0.85)
    border-radius: 20px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    font-size: 20px
    .title
      font-size: 25px
      font-weight: 600
      margin-bottom: 30px
    .user
      margin: 10px 0
      .inp
        border-radius: 5px
        padding: 5px
    .password
      margin: 10px 0
      .inp
        border-radius: 5px
        padding: 5px
    .handle
      display: flex
      .login
        width: 70px
        height: 40px
        line-height: 40px
        text-align: center
        background-color: #01b4e4
        border-radius: 10px
        font-weight: 600
        color: #fff
        cursor pointer
        margin: 10px 100px 0 0
      .register
        color: #01b4e4
        margin-top: 20px
        cursor pointer
</style>
