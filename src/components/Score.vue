<template>
  <div>
    <ul class="cleanfloat">
      <li 
        v-for="index in 5" 
        :key="index" 
        @mouseenter="enter(index)" 
        @mouseleave="leave()" 
        @click="Selected(index)" 
        :class="{'selected':cur>=index}"
      >★</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Score',
  props: ['movieid'],
  data() {
    return {
      cur : -1,
      flag : false,
      movieItem: []
    }
  },
  methods: {
    enter(idx){
      if(!this.flag){
          this.cur = idx;
      }
    },
    leave(){
      if(!this.flag){
          this.cur = -1;
      }
    },
    Selected(n){
      this.flag = true;
      this.cur = n;
      this.movieItem = {
        movieid: this.movieid,
        moviescore: this.cur
      }
    }
  }
}
</script>

<style scoped>
  .cleanfloat::after{
    display: block;
    clear: both;
    content:"";
    visibility: hidden;
    height: 0;
  }
  .cleanfloat {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  ul li{
    list-style:none;
    font-size:23px;
    color:#ccc;
    cursor:pointer;
  }
  .selected{
    color:#f4c91f
  }
</style>
