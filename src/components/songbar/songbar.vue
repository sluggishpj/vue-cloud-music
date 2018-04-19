<!-- 底部歌曲状态条 -->
<template>
  <div class="songbar-container" v-if="songDetail.al && songBarShow">
    <div class="songbar" @click="showPlayInterface">
      <div class="avatar">
        <img :src="songDetail.al.picUrl">
      </div>
      <div class="name-artist">
        <div class="name">{{songDetail.name}}</div>
        <div class="artist">
          <span v-for="(ar,idx) in songDetail.ar" :key="idx">{{ar.name}} </span>
        </div>
      </div>
      <span class="icon-list2 playlist-btn" @click.stop="showPlaylist"></span>
      <span :class="[playing?'icon-pause':'icon-play2','play-btn']" @click.stop="togglePlayState"></span>
      <span class="icon-next2 next-btn" @click.stop="nextSong"></span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    songDetail() {
      return this.$store.getters.getSongDetail
    },
    songBarShow() {
      return this.$store.getters.getSongBarShow
    },
    playing() {
      return this.$store.getters.getPlayState
    }
  },
  methods: {
    togglePlayState() {
      // 播放暂停
      this.$store.commit('togglePlayState')
    },
    nextSong() {
      // 下一首
      this.$store.dispatch('nextSong')
    },
    showPlaylist() {
      // 显示播放列表
      this.$store.commit('togglePlaylist')
    },
    showPlayInterface() {
      // 显示转盘界面
      this.$store.commit('togglePlayInterface')
    }
  }
}

</script>
<style lang="scss" scoped>
.songbar {
  position: fixed;
  bottom: 0;
  z-index: 60;
  width: 100%;
  height: 110px;
  background: #FEFEFE;
  display: flex;
  justify-content: stretch;
  align-items: center;
  .avatar {
    // 专辑图片
    width: 92px;
    height: 92px;
    flex: 0 0 92px;
    padding-left: 12px;
    img {
      width: 100%;
    }
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
      color: #333333;
      padding-bottom: 10px;
      width: 100%;
      font-size: 32px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
    }

    .artist {
      // 作者
      color: #888888;
      font-size: 24px;
    }
  }

  .playlist-btn,
  .play-btn,
  .next-btn {
    flex: 0 0 90px;
    text-align: center;
  }

  .playlist-btn {
    // 播放列表
    font-size: 32px;
  }

  .play-btn {
    // 播放按钮
    font-size: 60px;
  }

  .next-btn {
    // 下一首按钮
    flex: 0 1 60px;
    font-size: 44px;
    padding-right: 10px;
    transform: scaleX(1.5);
  }
}

.bg-cover {
  // 显示播放列表时背面的黑色半透明遮罩
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .4);
  z-index: 40;
  left: 0;
  top: 0;
}

</style>
