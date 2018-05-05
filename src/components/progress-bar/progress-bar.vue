<template>
  <div class="progress-bar">
    <span class="played-time time-span">{{timeToString(currentTime)}}</span>
    <div class="bar"
      ref="progressBar"
      @mousedown="onThumbMouseDown"
      @touchstart="onThumbTouchStart"
      @click="changeTargetTime">
      <div class="played-bar" :style="playedBarStyle"></div>
      <span class="progress-dot" ref="progressDot" :style="progressDotStyle"></span>
    </div>
    <span class="duration-time time-span">{{timeToString(duration)}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      targetTime: 0
    }
  },
  computed: {
    currentTime() {
      // 当前播放时间
      return this.$store.getters.getCurrentTime
    },
    duration() {
      // 歌曲总长
      return this.$store.getters.getDuration
    },
    playedPercent() {
      // 已播放的时长占总时长比例
      return this.currentTime / this.duration * 100
    },
    playedBarStyle() {
      // 已播放时长条长度样式
      return {
        width: this.playedPercent + '%'
      }
    },
    progressDotStyle() {
      // 进度条白点位置样式
      return {
        left: this.playedPercent * 95 / 100 + '%'
      }
    },
    progressBar() {
      // 进度条
      return this.$refs.progressBar
    },
    progressDot() {
      // 进度白点
      return this.$refs.progressDot
    },
    app() {
      // 容器，在index.html中定义
      return document.getElementById('app')
    },
    progressBarWidth() {
      // 进度条总长度
      return this.progressBar.offsetWidth
    },
    progressBarLeft() {
      // 进度条左边距离屏幕左边距离
      return this.progressBar.offsetLeft
    },
    progressBarRight() {
      // 进度条右边距离屏幕左边距离
      return this.progressBarWidth + this.progressBarLeft
    }
  },
  methods: {
    timeToString(num) {
      // 把秒数转换为xx:xx的形式
      num = Math.round(num)
      let second = num % 60
      let minute = Math.floor(num / 60)
      if (second < 10) {
        second = '0' + second
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      return minute + ':' + second
    },

    // 鼠标和触屏
    thumbStart() {
      this.$store.commit('changeProgressBarDragging', true) // 更新全局拖拽状态
    },
    thumbMove(clientX) {
      if (clientX < this.progressBarLeft) {
        // 移出左边界
        this.$store.commit('changeCurrentTime', 0)
      } else if (clientX > this.progressBarRight) {
        // 移出右边界
        this.$store.commit('changeCurrentTime', this.duration)
      } else {
        this.$store.commit('changeCurrentTime', (clientX - this.progressBarLeft) / this.progressBarWidth * this.duration)
      }
      this.targetTime = this.currentTime
    },
    thumbEnd() {
      this.$store.commit('changeProgressBarDragging', false) // 更新全局拖拽状态
      this.$store.commit('changeTargetTime', this.targetTime) // 更新目标时间
    },

    // 鼠标相关
    onThumbMouseDown(e) {
      this.thumbStart()
      this.app.addEventListener('mousemove', this.onThumbMouseMove, false)
      this.app.addEventListener('mouseup', this.onThumbMouseUp, false)
    },

    onThumbMouseMove(e) {
      this.thumbMove(e.clientX)
    },

    onThumbMouseUp(e) {
      this.thumbEnd()
      this.app.removeEventListener('mousemove', this.onThumbMouseMove, false)
      this.app.removeEventListener('mouseup', this.onThumbMouseUp, false)
    },

    // 触屏相关
    onThumbTouchStart(e) {
      this.thumbStart()
      this.app.addEventListener('touchmove', this.onThumbTouchMove, false)
      this.app.addEventListener('touchend', this.onThumbTouchEnd, false)
    },

    onThumbTouchMove(e) {
      this.thumbMove(e.touches[0].clientX)
    },

    onThumbTouchEnd(e) {
      this.thumbEnd()
      this.app.removeEventListener('touchmove', this.onThumbTouchMove, false)
      this.app.removeEventListener('touchend', this.onThumbTouchEnd, false)
    },

    changeTargetTime(e) {
      this.thumbMove(e.clientX)
      this.thumbEnd()
    }
  }
}

</script>
<style lang="scss" scoped>
.progress-bar {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  .time-span {
    // 显示时间
    flex: 0 0 90px;
    font-size: 24px;
    color: #BEBEBC;
    user-select: none;
    &.played-time {
      padding-left: 20px;
    }
    &.duration-time {
      padding-right: 20px;
    }
  }
  .bar {
    flex: 1;
    position: relative;
    height: 4px;
    width: 100%;
    background: #928980;
    background-clip: padding-box; // !!!避免背景扩张到border区域
    border-top: 20px transparent solid; // 增加透明border扩大点击区域
    border-bottom: 20px transparent solid;
    .played-bar {
      // 已播放时长条
      position: absolute;
      color: #BEBEBC;
      left: 0;
      height: 100%;
      background: #FF3838;
    }
    .progress-dot {
      // 控制时间白点
      position: absolute;
      left: 0%;
      bottom: -16px;
      width: 32px;
      height: 32px;
      background: #fff;
      border-radius: 50%;
    }
  }
}

</style>
