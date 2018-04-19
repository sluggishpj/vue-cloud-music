<!-- 播放列表 -->
<template>
  <div class="playlist" v-if="playlistShow">
    <scroll-lock class="lock-div">
      <div class="bg-cover" @click="hidePlaylist"></div>
    </scroll-lock>
    <div class="list-info">
      <div class="header">
        <span>播放列表</span>
        <span class="clear" @click="clearPlaylist">清空</span>
      </div>
      <scroll-lock class="lock-div play-list">
        <ul class="list">
          <li class="list-item" v-for="(item, idx) in listInfo.tracks" :key="idx" @click="playSong(item.id)">
            <span class="serial-num" :class="{'icon-volume-medium':item.id===playingSongID}" :data-num="idx"></span>
            <span class="name">{{item.name}}</span>
            <span class="artist" v-for="(artist, idx) in item.artists" :key="idx"> - {{artist.name}} </span>
          </li>
        </ul>
      </scroll-lock>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    playlistShow() {
      if (this.$store.getters.getPlaylistShow === true) {
        this.$nextTick(() => {
          let playList = document.getElementsByClassName('lock-div play-list')[0]
          if (playList) {
            let targetIndex = playList.getElementsByClassName('icon-volume-medium')[0].getAttribute('data-num')
            let docHeight = document.documentElement.clientHeight
            playList.scrollTop = (targetIndex - 3) * 98 / 1334 * docHeight
            console.log('scrollTop', playList.scrollTop)
          }
        })
      }
      return this.$store.getters.getPlaylistShow
    },
    playingSongID() {
      return this.$store.getters.getSongID
    },
    listInfo() {
      return this.$store.getters.getDisplayedListInfo
    }
  },
  methods: {
    playSong(id) {
      this.$store.commit('changePlayingList')
      this.$store.dispatch('changePlayingSong', id)
    },
    hidePlaylist() {
      this.$store.commit('togglePlaylist')
    },
    clearPlaylist() {
      // 清空播放列表
      this.$store.commit('togglePlaylist')
      this.$store.commit('togglePlayState')
      this.$store.commit('hideSongBar')
      this.$store.commit('updateSongID', '')
    }
  }
}

</script>
<style lang="scss" scoped>
.bg-cover {
  // 黑色半透明背景
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 72;
  background: rgba(0, 0, 0, .4);
}

.list-info {
  position: fixed;
  left: 0;
  top: 492px;
  bottom: 0;
  right: 0;
  z-index: 75;
  overflow: scroll;
  background: #FBFBFB;
  .header {
    height: 112px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: inline-block;
      line-height: 112px;
      color: #343434;
      flex: 1;
      &.clear {
        color: #898989;
      }
    }
    border-bottom: 1px solid #E3E3E3;
  }

  .lock-div {
    width: 100%;
    height: 726px;
    position: fixed;
    bottom: 0;
    overflow: scroll;
  }

  .list-item {
    text-align: left;
    height: 96px;
    line-height: 96px;
    margin-left: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #E3E3E3;
    .name {
      color: #333333;
      font-size: 32px;
    }
    .artist {
      color: #898989;
      font-size: 24px;
    }
  }
}

</style>
