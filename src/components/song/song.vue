<!-- 歌曲组件控制播放，暂停，调进度 -->
<template>
  <div class="song" v-show="false">
    <audio controls autoplay type="audio/mp3" :src="songURL" ref="music" @ended="ended" :loop="loop">
    </audio>
  </div>
</template>
<script>
export default {
  computed: {
    songURL() {
      return this.$store.getters.getSongURL
    },
    playing() {
      return this.$store.getters.getPlayState
    },
    playMode() {
      return this.$store.getters.getPlayMode
    },
    loop() {
      // 是否单曲循环
      return this.playMode === 2
    }
  },

  watch: {
    playing() {
      // 播放或暂停
      if (this.playing === true) {
        let playPromise = this.$refs.music.play()
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('播放中')
          }).catch(err => {
            console.log('播放出错', err)
          })
        }
      } else {
        this.$refs.music.pause()
      }
    }
  },

  methods: {
    ended() {
      // 播放结束
      console.log('歌结束了')
      if (this.playMode === 0) {
        // 列表循环
        this.$store.dispatch('nextSong')
      } else if (this.playMode === 1) {
        // 随机播放
        this.$store.dispatch('randomSong')
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.song {
  position: fixed;
  bottom: 200px;
}

</style>
