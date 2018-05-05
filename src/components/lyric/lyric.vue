<template>
  <div class="lyric" v-if="lyricObj && lyricObj.code" ref="lyricContainer" @touchmove="onThumbTouchMove" @touchend="onThumbTouchEnd">
    <div class="lyric-concainer">
      <!-- 空div，用于撑开位置 -->
      <div class="empty"></div>
      <div v-for="(item, index) in lyric" v-if="item[0] || item[0] === 0" :key="index" :class="{'active': item[0] <= currentTime && lyric[index+1] && (lyric[index+1][0] > currentTime)}">
        <p>{{item[1]}}</p>
        <p v-if="item[2]">{{item[2]}}</p>
      </div>
      <div class="user">
        <p v-if="lyricObj.lyricUser">歌词贡献者：{{lyricObj.lyricUser.nickname}}</p>
        <p v-if="lyricObj.transUser">翻译贡献者：{{lyricObj.transUser.nickname}}</p>
      </div>
      <div class="empty"></div>
    </div>
  </div>
</template>
<script>
import api from '../../fetch/api.js'
export default {
  data() {
    return {
      lyricObj: {},
      draggingLyric: false, // 是否正在拖拽歌词
      dragTimer: null // 用于记录拖拽停止后过几秒开始滚动的定时器
    }
  },
  computed: {
    songID() {
      // 歌曲ID
      return this.$store.getters.getSongID
    },
    progressBarDragging() {
      // 是否正在拖拽进度
      return this.$store.getters.getProgressBarDragging
    },
    currentTime() {
      // 当前播放时间
      return this.$store.getters.getCurrentTime
    },
    duration() {
      // 歌曲总长度
      return this.$store.getters.getDuration
    },

    lyric() {
      // 最终的歌词，格式为[[秒, 原词 ,翻译],...]
      let targetLyric = []
      let tlyric = {} // 翻译的歌词，格式为{秒: 译词, 秒: 译词, ...}
      let sec = 0 // 秒数
      let lyr = '' // 歌词

      if (this.lyricObj.nolyric) {
        // 无歌词
        return [
          [0, '纯音乐，请欣赏'],
          [Math.round(this.duration), '']
        ]
      }

      if (this.lyricObj.tlyric && this.lyricObj.tlyric.lyric) {
        // 翻译
        this.lyricObj.tlyric.lyric.split('\n').map(item => {
          sec = this.timeStrToNum(item.slice(1, 9)) // 秒数
          lyr = item.slice(item.indexOf(']') + 1) // 译词
          tlyric[sec] = lyr
        })
      }

      if (this.lyricObj.lrc && this.lyricObj.lrc.lyric) {
        // 整合原词和译词
        targetLyric = this.lyricObj.lrc.lyric.split('\n').map((item, i) => {
          sec = this.timeStrToNum(item.slice(1, 9)) // 秒数
          lyr = item.slice(item.indexOf(']') + 1) // 原词
          return [sec, lyr, tlyric[sec]]
        })

        targetLyric.pop() // 删掉最后一个'\n'产生的0时刻
        targetLyric.push([Math.round(this.duration), ''])
        console.log(targetLyric)
        return targetLyric
      }
    },

    lyricShowHeight() {
      // 歌词显示区域高度
      return this.$refs.lyricContainer.offsetHeight
    },
    lyricContainer() {
      // 歌词显示区域容器
      return this.$refs.lyricContainer
    }
  },
  mounted() {
    this.getLyric()
  },
  watch: {
    songID() {
      this.getLyric()
    },
    currentTime() {
      // 更新歌词位置
      this.updateLyricPos()
    }
  },
  methods: {
    getLyric() {
      // 获取歌词
      api.getLyric(this.songID)
        .then(res => {
          this.lyricObj = res.data
          console.log('lyric', this.lyricObj)
        })
    },

    timeStrToNum(str) {
      // 将00:00.00转换为秒数
      let minute = Number(str.slice(0, 2))
      let second = Number(str.slice(3, 5))
      let minSec = Number(str.slice(6, 8))
      return minute * 60 + second + Math.round(minSec / 100)
    },

    updateLyricPos() {
      // 更新歌词位置
      if (!this.draggingLyric && !this.progressBarDragging) {
        // 没有拖拽歌词并且没有拖拽进度
        let activeLyric = this.lyricContainer.getElementsByClassName('active')[0] // 当前高亮的歌词

        if (activeLyric) {
          let scrollTarget = activeLyric.offsetTop - this.lyricShowHeight / 2
          this.scrollToTarget(this.lyricContainer, scrollTarget)
        }
      }
    },

    scrollToTarget(ele, target) {
      // ele容器滚动到目标位置
      let timer = null
      let nowScrollTop = ele.scrollTop
      let scrollUnit = 2 // 每次滚动的单位
      // 当高亮歌词和当前屏幕中间歌词距离超过该值时滚动速度变快
      let sideHeight = this.lyricShowHeight / 6
      if (nowScrollTop < target - 1) {
        timer = setInterval(() => {
          if (Math.abs(target - nowScrollTop) > sideHeight) {
            scrollUnit = sideHeight
          } else {
            scrollUnit = 2
          }
          nowScrollTop += scrollUnit
          ele.scrollTop = nowScrollTop
          if (nowScrollTop >= target - 1 && nowScrollTop <= target + 1) {
            clearInterval(timer)
          }
        }, 20)
      } else if (nowScrollTop > target + 1) {
        timer = setInterval(() => {
          if (Math.abs(target - nowScrollTop) > sideHeight) {
            scrollUnit = 20
          } else {
            scrollUnit = 2
          }
          nowScrollTop -= scrollUnit
          ele.scrollTop = nowScrollTop
          if (nowScrollTop >= target - 1 && nowScrollTop <= target + 1) {
            clearInterval(timer)
          }
        }, 20)
      }
    },

    onThumbTouchMove() {
      // 开始拖拽歌词
      this.draggingLyric = true
      clearTimeout(this.dragTimer)
    },

    onThumbTouchEnd() {
      // 拖拽结束
      this.dragTimer = setTimeout(() => {
        this.draggingLyric = false
      }, 3000)
    }
  }
}

</script>
<style scoped lang="scss">
.lyric {
  width: 100%;
  overflow-y: scroll;
  .lyric-concainer {
    transition: all linear .4s;
    .empty {
      height: 300px;
    }
    div {
      p {
        font-size: 28px;
        line-height: 40px;
        color: #ADAAA8;
        &:first-child {
          padding-top: 40px;
        }
      }
      &.active p {
        font-size: 32px;
        transition: all 1s;
        color: #fff;
      }
    }
    .user p {
      line-height: 48px;
    }
  }
}

</style>
