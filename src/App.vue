<template>
  <div id="app">
    <v-header></v-header>
    <userinfo></userinfo>
    <song-menu-detail></song-menu-detail>
    <songbar></songbar>
    <song></song>
    <playlist></playlist>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import header from './components/header/header.vue'
import userinfo from './components/userinfo/userinfo.vue'
import songMenuDetail from './components/song-menu-detail/song-menu-detail.vue'
import songbar from './components/songbar/songbar.vue'
import song from './components/song/song.vue'
import playlist from './components/playlist/playlist.vue'

export default {
  components: {
    'v-header': header,
    'song-menu-detail': songMenuDetail,
    userinfo,
    songbar,
    song,
    playlist
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
