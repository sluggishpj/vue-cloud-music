<!-- 歌曲组件控制播放，暂停，调进度 -->
<template>
  <div class="song" v-show="false">
    <audio controls autoplay
      type="audio/mp3"
      ref="audio"
      :src="songURL"
      :loop="loop"
      @canplay="canplay"
      @ended="ended"
      @timeupdate="timeupdate"
      @durationchange="durationchange"></audio>
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
    },
    audio() {
      return this.$refs.audio
    },
    progressBarDragging() {
      // 是否正在拖拽进度
      return this.$store.getters.getProgressBarDragging
    },
    targetTime() {
      // 跳转目标时间
      return this.$store.getters.getTargetTime
    },
    volume() {
      return this.$store.getters.getVolume
    }
  },

  watch: {
    playing() {
      // 播放或暂停
      if (this.playing === true) {
        let playPromise = this.audio.play()
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('播放中')
          }).catch(err => {
            console.log('播放出错', err)
          })
        }
      } else {
        this.audio.pause()
      }
    },
    targetTime() {
      // 更新歌曲进度
      this.audio.currentTime = this.targetTime
    },
    volume() {
      // 调整音量大小
      this.audio.volume = this.volume
    }
  },

  methods: {
    canplay() {
      // 初始化音量
      this.audio.volume = this.volume
    },

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
    },

    timeupdate() {
      // 更新播放时间
      if (!this.progressBarDragging) {
        this.$store.commit('changeCurrentTime', Math.round(this.audio.currentTime))
      }
    },

    durationchange() {
      // 歌曲总长发生变化时，也就是切歌时，更新歌曲的时长
      this.$store.commit('updateDuration', this.audio.duration)
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
