<template>
  <div>
    <Header class="header" />
    <div class="page-title">根据您的喜好，为您推荐以下电影~</div>
    <div class="content-wrapper">
      <div class="item-wrapper" v-for="item of movieData" :key="item.movieid">
        <div class="img-wrapper">
          <img class="img" :src="item.picture">
        </div>
        <div class="title">
          <p class="info">{{item.moviename}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'Result',
  components: {
    Header
  },
  data() {
    return {
      movieData: [],
      selectResult: []
    }
  },
  created() {
    this.$EventBus.$on('recommendData', (res) => {
      this.movieData = res;
    })
  },
  beforeDestroy () {
    this.$EventBus.$off('recommendData')
  }
}
</script>

<style lang="stylus" scoped>
.page-title
  margin-top: 80px
  text-align: center
  font-size: 22px
  font-weight: 600
  color: #09b5e2
.content-wrapper
  width: 900px
  height 580px
  margin: 0 auto
  margin-top: 10px
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
    .title
      width: 100%
      height: 20%
      font-size: 18px
      text-align: center
      .info
        margin: 6px
        line-height: 24px
        display:-webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        overflow: hidden;
  .item-wrapper:hover
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25)
    transform: translate(-2px, -2px)
</style>
