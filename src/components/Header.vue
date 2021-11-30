<template>
  <div class="wrapper">
    <div class="logo-wrapper">
      <img class="img" src="https://axton-tang.top/img/logo.png" alt="axton">
      <p class="title">大数据电影推荐系统</p>
    </div>
    <div class="author">制作者：唐诚</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.wrapper
  position: fixed
  top: 0
  left: 0
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  height: 64px
  background-color: #032541
  color: #fff
  font-weight: 600
  .logo-wrapper
    display: flex
    align-items: center
    .img
      margin-left: 20px
      width: 100px
      height: 30px
    .title
      font-size: 22px
      margin-left: 10px
      letter-spacing: 5px
  .author
    font-size: 16px
    margin-right: 20px

</style>
