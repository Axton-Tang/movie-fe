<template>
  <div>
    <Header class="header" />
    <div class="content-wrapper">
      <div class="item-wrapper" v-for="item of movieData" :key="item.movieid">
        <div class="img-wrapper">
          <img class="img" :src="item.picture">
        </div>
        <div class="score">
          <div class="tip">请评分</div>
          <Score ref="score" :name="item.movieid" :movieid="item.movieid"/>
        </div>
      </div>
    </div>
    <div class="recommend" @click="clickRecommend">开始个性化推荐</div>
    <div class="reset" @click="getMovieList">
      <span>换一批</span>
      <img class="reset-icon" src="../assets/refresh.png">
    </div>
    <div class="recommend-wait" v-if="showLoading">
      <div class="remind">提示</div>
      <div class="loading">
        <div class="loading-tip">正在为您生成个性化推荐内容</div>
        <img class="loading-img" src="../assets/loading.gif">
      </div>
    </div>
    <Pop v-if="showPop" :msg="popMessage" :status=false />
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import Score from './Score.vue'
import Pop from './Pop.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Score,
    Pop
  },
  data() {
    return {
      movieData: [],
      showLoading: false,
      showPop: false,
      popMessage: '',
      recommendResult: []
    }
  },
  methods: {
    clickRecommend() {
      const result = [];
      for (let i = 0; i < 10; i++) {
        const movieItem =this.$refs.score[i].movieItem
        if (movieItem.length === 0) {
          this.popMessage = '您还有评分未完成'
          this.showPop = true;
          setTimeout(() => {
            this.showPop = false;
          }, 2000)
          return;
        }
        result.push(movieItem);
      }
      const userid = sessionStorage.getItem("movie-userId");
      axios.post('/api/submituserscore', {
        userid,
        selectResult: result
      }).then(res => {
        if (res && res.data && res.data.status === 'success') {
          this.showLoading = true;
          axios.post('/api/recommendmovieforuser', {userid}).then(res => {
            if (res && res.data && res.data.status === 'success') {
              this.showLoading = false;
              this.recommendResult = res.data.data
              this.$router.push('/detail');
            } else {
              this.showLoading = false;
              this.popMessage = '个性化推荐异常'
              this.showPop = true;
              setTimeout(() => {
                this.showPop = false;
              }, 2000)
            }
          })
        } else {
          this.popMessage = '个性化推荐异常'
          this.showPop = true;
          setTimeout(() => {
            this.showPop = false;
          }, 2000)
        }
      })
    },
    getMovieList() {
      const userid = sessionStorage.getItem("movie-userId");
      if (userid) {
        axios.get('/api/getList?userid=' + userid).then((res) => {
          if (res && res.data && res.data.status === 'success') {
            this.movieData = res.data.data.movieforpage;
          }
        })
      } else {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    this.getMovieList();
  },
  beforeDestroy() {
    this.$EventBus.$emit("recommendData", this.recommendResult);
  }
}
</script>

<style lang="stylus" scoped>
.content-wrapper
  width: 900px
  height 580px
  margin: 0 auto
  margin-top: 64px
  display: flex
  align-items: center
  justify-content: space-between
  flex-direction: row
  flex-wrap: wrap
  box-sizing: border-box
  .item-wrapper
    width: 150px
    height: 280px
    margin: 10px
    border-radius: 10px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15)
    cursor:pointer
    transition: ease-in-out 0.2s
    .img-wrapper
      width: 100%
      height: 80%
      .img
        width: 100%
        height: 100%
        border-top-left-radius: 10px
        border-top-right-radius: 10px
    .score
      text-align: center
      padding: 5px
      .tip
        margin: 5px
        color: #032541
        font-weight: 600
  .item-wrapper:hover
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25)
    transform: translate(-2px, -2px)
.recommend 
  width: 500px
  height: 40px
  line-height: 40px
  text-align: center
  background-color: #01b4e4
  font-size: 18px
  font-weight: 600
  color: #fff
  border-radius: 50px
  margin: 0 auto
  margin-top: 25px
  cursor pointer
.reset
  position: fixed
  top: 100px
  right: 100px
  font-size: 18px
  color: #01b4e4
  cursor pointer
  .reset-icon
    width: 18px
    margin-left: 8px
.recommend-wait
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 550px
  height: 300px
  background-color: #fff
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25)
  border-radius: 10px
  .remind
    position: relative
    top: 0
    width: 100%
    height: 50px
    line-height: 50px
    font-size: 20px
    color: #fff
    text-align: center
    background-color: #01b4e4
    border-top-left-radius: 10px
    border-top-right-radius: 10px
  .loading
    position relative
    width: 100%
    height: 250px
    text-align: center
    .loading-tip
      position absolute
      top: 25px
      left: 50%
      transform: translateX(-50%)
      font-size: 20px
    .loading-img
      height: 100%
</style>
