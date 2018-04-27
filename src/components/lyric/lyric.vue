<template>
  <div class="lyric" v-if="lyricObj && lyricObj.code" ref="lyric">
    <div class="lyric-concainer" ref="lyricContainer">
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
      lyricObj: {}
    }
  },
  computed: {
    songID() {
      return this.$store.getters.getSongID
    },
    currentTime() {
      return this.$store.getters.getCurrentTime
    },
    lyric() {
      // 最终的歌词，格式为[[秒, 原词 ,翻译],...]
      let tlyric = [] // 翻译的歌词
      if (this.lyricObj.nolyric) {
        // 无歌词
        return [
          [0, '纯音乐，请欣赏']
        ]
      }
      if (this.lyricObj.tlyric && this.lyricObj.tlyric.lyric) {
        // 翻译
        tlyric = this.lyricObj.tlyric.lyric.split('\n').map(item => {
          return item.slice(item.indexOf(']') + 1)
        })
      }
      if (this.lyricObj.lrc && this.lyricObj.lrc.lyric) {
        // 原词
        let sec = 0 // 秒数
        let lyr = '' // 歌词
        return this.lyricObj.lrc.lyric.split('\n').map((item, i) => {
          sec = this.timeStrToNum(item.slice(1, 9)) // 秒数
          lyr = item.slice(item.indexOf(']') + 1) // 原词
          return [sec, lyr, tlyric[i]]
        })
      }
    },
    lyricHeight() {
      // 歌词高度
      return document.getElementsByClassName('active')[0].offsetHeight
    },
    lyricShowHeight() {
      // 歌词显示区域高度
      return this.$refs.lyric.offsetHeight
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
      let lyricContainer = this.$refs.lyricContainer
      let activeLyric = document.getElementsByClassName('active')[0]
      if (activeLyric) {
        let scrollUp = activeLyric.offsetTop - this.lyricShowHeight / 2 + this.lyricHeight
        lyricContainer.style.transform = `translateY(-${scrollUp}px)`
      }
    }
  },
  methods: {
    getLyric() {
      // 获取歌词
      api.getLyric(this.songID)
        .then(res => {
          this.lyricObj = res.data
          console.log(this.lyricObj)
        })
    },
    timeStrToNum(str) {
      // 将00:00.00转换为秒数
      let minute = Number(str.slice(0, 2))
      let second = Number(str.slice(3, 5))
      let minSec = Number(str.slice(6, 8))
      return minute * 60 + second + Math.round(minSec / 100)
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
        color: #fff;
      }
    }
  }
}

</style>
