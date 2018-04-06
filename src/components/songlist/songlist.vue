<!-- 歌曲列表 -->
<template>
  <div class="songlist">
    <div class="header">
      <span class="icon-play2 play-btn"></span>
      <span class="title">播放全部<span class="count">(共{{listInfo.trackCount}}首)</span></span>
    </div>
    <ul class="list">
      <li class="list-item" v-for="(item, idx) in listInfo.tracks" :key="idx">
        <span class="serial-num">{{idx+1}}</span>
        <div class="item-detail">
          <span class="name">{{item.name}}</span>
          <span class="artists" v-for="(artist, idx) in item.artists" :key="idx">{{artist.name}} </span>
          <span class="album">- {{item.album.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    listInfo: {}
  }
}

</script>
<style lang="scss" scoped>
.songlist {
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
    display: block;
    position: relative;
    height: 128px;
    display: flex;
    .serial-num {
      flex: 0 0 78px;
      background: yellow;
    }
    .item-detail {
      flex: 1;
      display: flex;
      .name {

      }
    }
  }
}

</style>
