<template>
  <div :class="[status ? 'success message' : 'fail message']">
    <img v-if="status" class="message-icon" src="../assets/success.png" alt="成功">
    <img v-else class="message-icon" src="../assets/fail.png" alt="失败">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'Pop',
  props: ['msg', 'status']
}
</script>

<style lang="stylus" scoped>
.message
  position: fixed
  top: 15%
  right: 40px
  width: 220px
  height: 50px
  line-height: 50px
  padding-left: 20px
  font-size: 20px
  font-font-weight: 600
  border-radius: 10px
  .message-icon
    width: 23px
    height:23px
    margin-right: 10px
.success
  background-color: #f0f9eb
  color: #67c23a
.fail
  background-color: #fef0f0
  color: #e84537
</style>
