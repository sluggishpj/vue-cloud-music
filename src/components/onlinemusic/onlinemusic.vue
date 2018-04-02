<template>
  <div class="onlinemusic">
    <h1>This is onlineMusic</h1>
      <div class="tab">
        <div class="tab-item">
          <router-link to="privateFM">私人FM</router-link>
        </div>
        <div class="tab-item">
          <router-link to="dayrecommend">每日歌曲推荐</router-link>
        </div>
      </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .onlinemusic {
    width: 750px;
    height: 600px;
    background: #ccc;
  }
</style>
