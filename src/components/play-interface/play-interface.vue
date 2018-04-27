<template>
  <div class="play-interface" v-if="songDetail">
    <div class="bg">
      <img :src="songDetail.al.picUrl">
    </div>
    <div class="content">
      <div class="header">
        <span class="back-arrow icon-arrow-left2" @click="back"></span>
        <div class="name-artist">
          <div class="name">{{songDetail.name}}</div>
          <div class="artist">
            <span v-for="(ar,idx) in songDetail.ar" :key="idx">{{ar.name}} </span>
          </div>
        </div>
      </div>
      <div class="main" @click="togglePositive">
        <!-- 正面 -->
        <div class="positive" v-show="showPositive">
          <span class="cd-bar" :class="{'rotate-bar':!playing}">
            <img src="../../assets/cd-bar.png" height="414" width="276" alt="">
          </span>
          <div class="cd-mine rotate-cd-mine" :class="{'animated':playing,'paused':!playing}">
            <img :src="songDetail.al.picUrl">
          </div>
        </div>
        <!-- 反面 -->
        <div class="negative" v-show="!showPositive">
          <volume-bar class="volume-bar"></volume-bar>
          <lyric class="lyric"></lyric>
        </div>
      </div>
      <div class="footer">
        <progress-bar class="progress-bar"></progress-bar>
        <div class="menus">
          <span class="play-mode" :class="playModeClass" @click="changePlayMode"></span>
          <span class="icon-previous prev-btn" @click="prevSong"></span>
          <span :class="[playing?'icon-pause':'icon-play2','play-btn']" @click="togglePlayState"></span>
          <span class="icon-next next-btn" @click="nextSong"></span>
          <span class="icon-list2 playlist" @click="showPlaylist"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import progressBar from '../progress-bar/progress-bar.vue'
import volumeBar from '../volume-bar/volume-bar.vue'
import lyric from '../lyric/lyric.vue'

export default {
  components: {
    'progress-bar': progressBar,
    'volume-bar': volumeBar,
    'lyric': lyric
  },
  data() {
    return {
      showPositive: true // 显示正面
    }
  },
  computed: {
    playInterfaceShow() {
      return this.$store.getters.getPlayInterfaceShow
    },
    songDetail() {
      return this.$store.getters.getSongDetail
    },
    playing() {
      return this.$store.getters.getPlayState
    },
    playModeClass() {
      let playMode = this.$store.getters.getPlayMode
      if (playMode === 0) {
        // 列表循环播放
        return 'icon-loop'
      } else if (playMode === 1) {
        // 随机播放
        return 'icon-shuffle'
      } else if (playMode === 2) {
        // 单曲循环
        return 'icon-repeat_one'
      }
    }
  },
  methods: {
    togglePlayState() {
      // 播放暂停
      this.$store.commit('togglePlayState')
    },
    prevSong() {
      // 上一首
      this.$store.dispatch('prevSong')
    },
    nextSong() {
      // 下一首
      this.$store.dispatch('nextSong')
    },
    showPlaylist() {
      // 显示播放列表
      this.$store.commit('togglePlaylist')
    },
    back() {
      // 返回
      this.$router.go(-1)
    },
    changePlayMode() {
      // 改变播放模式
      this.$store.commit('changePlayMode')
    },
    togglePositive() {
      // 切换正反面
      this.showPositive = !this.showPositive
    }
  }
}

</script>
<style lang="scss">
.play-interface {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 70;
  .bg {
    // 模糊背景
    position: fixed;
    left: 0;
    top: 0;
    width: 160%;
    height: 160vh;
    z-index: -1;
    filter: blur(80px);
    margin: -200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    // 阴影背景
    background: rgba(0, 0, 0, .45);
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    width: 100%;
    flex: 0 0 128px;
    height: 128px;
    display: flex;
    align-items: center;
    .back-arrow {
      // 返回箭头
      color: #fff;
      width: 112px;
      height: 112px;
      font-size: 40px;
      line-height: 112px;
    }
    .name-artist {
      // 歌名和作者
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-left: 20px;
      white-space: nowrap;
      overflow: hidden;
      .name {
        // 歌名
        color: #fff;
        padding-bottom: 10px;
        width: 100%;
        font-size: 32px;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }

      .artist {
        // 作者
        color: #A5A4A3;
        font-size: 24px;
      }
    }
  }
  .main {
    flex: 1;
    user-select: none;
    overflow: hidden;
    .positive {
      // 正面
      height: 100%;
      overflow: hidden;
      box-shadow: 0px -1px 1px -1px #928980;
      .cd-bar {
        display: inline-block;
        position: relative;
        left: 8%;
        top: -32px;
        width: auto;
        height: 300px;
        z-index: 1;
        transition: all linear .4s;
        transform-origin: 36px 36px;
        img {
          width: auto;
          height: 100%;
        }
        &.rotate-bar {
          // 暂停状态时旋转一定角度
          transform: rotateZ(-30deg);
        }
      }

      .cd-mine {
        position: absolute;
        left: calc(50% - 285px);
        top: 260px;
        width: 570px;
        height: 570px;
        background: url(../../assets/cd-mine.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 360px;
          height: 360px;
          border-radius: 50%;
        }
      }
    }
    .negative {
      height: 100%;
      display: flex;
      flex-direction: column;
      .volume-bar {
        flex: 0 0 50px;
      }
      .lyric {
        flex: 1;
      }
    }
  }

  .footer {
    // 底部控制菜单
    flex: 0 0 240px;
    width: 100%;
    bottom: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .progress-bar {
      // 进度条
      flex: 0 0 20px;
      padding-top: 20px;
    }
    .menus {
      flex: 1;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      .play-mode,
      .playlist {
        // 播放模式，播放列表
        padding: 40px;
        color: #B0ADAF;
        font-size: 40px;
      }

      .play-btn {
        // 播放暂停
        font-size: 96px;
      }
      .prev-btn,
      .next-btn {
        // 前一首，后一首
        font-size: 68px;
      }
    }
  }
}

.animated {
  animation-duration: 20s;
  animation-fill-mode: both;
  animation-play-state: running;
}

.paused {
  animation-duration: 20s;
  animation-fill-mode: both;
  animation-play-state: paused;
}

.rotate-cd-mine {
  animation-name: rotateCD;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotateCD {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

</style>
