<template>
  <div id="app">
    <v-header></v-header>
    <songbar></songbar>
    <song></song>
    <playlist></playlist>
    <play-interface></play-interface>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import header from './components/header/header.vue'
import songbar from './components/songbar/songbar.vue'
import song from './components/song/song.vue'
import playlist from './components/playlist/playlist.vue'
import playInterface from './components/play-interface/play-interface.vue'

export default {
  components: {
    'v-header': header,
    songbar,
    song,
    playlist,
    'play-interface': playInterface
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
