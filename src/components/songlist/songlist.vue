<!-- 歌曲列表 -->
<template>
  <div class="songlist" :class="{'songbar-padding':songBarShow}">
    <div class="header">
      <span class="icon-play2 play-btn"></span>
      <span class="title">播放全部<span class="count">(共{{listInfo.trackCount}}首)</span></span>
    </div>
    <ul class="song-list">
      <li class="list-item" v-for="(item, idx) in listInfo.tracks" :key="idx" @click="playSong(item.id)">
        <span class="serial-num" :class="{'icon-volume-medium':item.id===playingSongID}">{{item.id===playingSongID?'':(idx+1)}}</span>
        <div class="item-detail">
          <div class="name">{{item.name}}</div>
          <div class="artist-album">
            <span class="artists" v-for="(artist, idx) in item.artists" :key="idx">{{artist.name}} </span>
            <span class="album">- {{item.album.name}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    playingSongID() {
      return this.$store.getters.getSongID
    },
    songBarShow() {
      return this.$store.getters.getSongBarShow
    }
  },
  props: {
    listInfo: {}
  },
  methods: {
    playSong(id) {
      this.$store.commit('changePlayingList')
      this.$store.dispatch('changePlayingSong', id)
    }
  }
}

</script>
<style lang="scss" scoped>
.songlist {
  width: 100%; // overflow: hidden;
  .header {
    height: 102px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #DADCDD;
    .play-btn {
      font-size: 40px;
      padding: 20px;
    }
    .title {
      // 播放全部字
      .count {
        color: #999999;
        font-size: 28px;
      }
    }
  }
  .list-item {
    display: flex;
    position: relative;
    align-items: center;
    height: 128px;
    width: 100%;
    .serial-num {
      color: #999999;
      flex: 0 0 110px;
      &.icon-volume-medium {
        color: #CE3D3E;
      }
    }
    .item-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 100%;
      white-space: nowrap;
      border-bottom: 1px solid #DADCDD;
      overflow: hidden;
      .name {
        // 歌名
        width: 100%;
        text-align: left;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }
      .artist-album {
        // 作者及唱片
        width: 100%;
        padding-top: 20px;
        font-size: 24px;
        color: #999999;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }
    }
  }
}

</style>
