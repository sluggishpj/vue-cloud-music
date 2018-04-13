<template>
  <div id="app">
    <v-header></v-header>
    <userinfo></userinfo>
    <playlist-detail></playlist-detail>
    <songbar></songbar>
    <song></song>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import header from './components/header/header.vue'
import userinfo from './components/userinfo/userinfo.vue'
import playlistDetail from './components/playlist-detail/playlist-detail.vue'
import songbar from './components/songbar/songbar.vue'
import song from './components/song/song.vue'

export default {
  components: {
    'v-header': header,
    'playlist-detail': playlistDetail,
    userinfo,
    songbar,
    song
  },

  mounted() {
    this.$store.dispatch('changeOwnUser', '46088643')
  }
}

</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
}

.songbar-padding {
  padding-bottom: 110px;
}
</style>
