<template>
  <div class="onlinemusic">
    <slide></slide>
    <div class="tab">
      <div class="tab-item">
        <router-link to="privateFM">
          <span class="icon-radio icon"></span>
          <span class="text">私人FM</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="dayrecommend">
          <span class="icon">{{new Date().getDate()}}</span>
          <span class="text">每日歌曲推荐</span>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import slide from '../slide/slide.vue'

export default {
  name: 'onlinemusic',
  components: {
    slide
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>
<style scoped lang="scss">
.onlinemusic {
  width: 750px;
}

.tab {
  background: #F2F4F5;
  border-bottom: 1px solid #ccc;
  display: flex;
  height: 220px;
  justify-content: space-around;
  align-items: center; // 注意，<router-link>相当于a标签
  .tab-item a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;

    .icon {
      flex: 0 1 100px;
      font-size: 60px;
      width: 100px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .text {
      padding-top: 14px;
      font-size: 24px;
      word-break: keep-all;
    }
  }
}

</style>
