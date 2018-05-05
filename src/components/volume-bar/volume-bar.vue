<template>
  <div class="volume-bar">
    <div class="icon-volume-medium volume-icon"></div>
    <div class="bar"
      ref="volumeBar"
      @mousedown="onThumbMouseDown"
      @touchstart="onThumbTouchStart"
      @click.stop="changeVolume">
      <div class="now-volume-bar" :style="nowVolumeBarStyle"></div>
      <span class="volume-dot" ref="volumeDot" :style="volumeDotStyle"></span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    volume() {
      return this.$store.getters.getVolume
    },
    nowVolumeBarStyle() {
      // 当前音量样式
      return {
        width: Math.round(this.volume * 100) + '%'
      }
    },
    volumeDotStyle() {
      // 音量白点样式
      return {
        left: Math.round(this.volume * 97) + '%'
      }
    },
    volumeBar() {
      // 音量条
      return this.$refs.volumeBar
    },
    app() {
      // 容器，在index.html中定义
      return document.getElementById('app')
    },
    volumeBarWidth() {
      // 音量条总长度
      return this.volumeBar.offsetWidth
    },
    volumeBarLeft() {
      // 音量条左边距离屏幕左边距离
      return this.volumeBar.offsetLeft
    },
    volumeBarRight() {
      // 音量条右边距离屏幕左边距离
      return this.volumeBarWidth + this.volumeBarLeft
    }
  },
  methods: {
    // 鼠标和触屏
    thumbMove(clientX) {
      if (clientX < this.volumeBarLeft) {
        // 移出左边界
        this.$store.commit('changeVolume', 0)
      } else if (clientX > this.volumeBarRight) {
        // 移出右边界
        this.$store.commit('changeVolume', 1)
      } else {
        this.$store.commit('changeVolume', (clientX - this.volumeBarLeft) / this.volumeBarWidth)
      }
    },

    // 鼠标相关
    onThumbMouseDown(e) {
      this.app.addEventListener('mousemove', this.onThumbMouseMove, false)
      this.app.addEventListener('mouseup', this.onThumbMouseUp, false)
    },

    onThumbMouseMove(e) {
      this.thumbMove(e.clientX)
    },

    onThumbMouseUp(e) {
      this.app.removeEventListener('mousemove', this.onThumbMouseMove, false)
      this.app.removeEventListener('mouseup', this.onThumbMouseUp, false)
    },

    // 触屏相关
    onThumbTouchStart(e) {
      this.app.addEventListener('touchmove', this.onThumbTouchMove, false)
      this.app.addEventListener('touchend', this.onThumbTouchEnd, false)
    },

    onThumbTouchMove(e) {
      this.thumbMove(e.touches[0].clientX)
    },

    onThumbTouchEnd(e) {
      this.app.removeEventListener('touchmove', this.onThumbTouchMove, false)
      this.app.removeEventListener('touchend', this.onThumbTouchEnd, false)
    },

    changeVolume(e) {
      // 点击直接改变音量
      this.thumbMove(e.clientX)
    }
  }
}

</script>
<style scoped lang="scss">
.volume-bar {
  display: flex;
  width: 90vw;
  justify-content: center;
  align-items: center;
  .volume-icon {
    // 音量图标
    flex: 0 0 80px;
    font-size: 28px;
    padding-left: 20px;
    padding-top: 4px;
    text-align: center;
    color: #B8B5B3;
  }
  .bar {
    flex: 1;
    background: #6F6A68;
    position: relative;
    height: 4px;
    background: #928980;
    background-clip: padding-box; // !!!避免背景扩张到border区域
    border-top: 20px transparent solid; // 增加透明border扩大点击区域
    border-bottom: 20px transparent solid;

    .now-volume-bar {
      position: absolute;
      color: #BEBEBC;
      left: 0;
      width: 50%;
      height: 100%;
      background: #B5B2B1;
    }

    .volume-dot {
      position: absolute;
      left: 50%;
      bottom: -9px;
      width: 20px;
      height: 20px;
      background: #F3F3F3;
      border-radius: 50%;
    }
  }
}

</style>
