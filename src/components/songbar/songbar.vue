<!-- 底部歌曲状态条 -->
<template>
  <div class="songbar" v-if="songDetail.al && songBarState">
    <div class="avatar">
      <img :src="songDetail.al.picUrl">
    </div>
    <div class="name-artist">
      <div class="name">{{songDetail.name}}</div>
      <div class="artist">
        <span v-for="(ar,idx) in songDetail.ar" :key="idx">{{ar.name}} </span>
      </div>
    </div>
    <span class="icon-list2 play-list"></span>
    <span class="icon-play2 play-btn"></span>
    <span class="icon-next2 next-btn"></span>
  </div>
</template>
<script>
export default {
  computed: {
    songDetail() {
      return this.$store.getters.getSongDetail
    },
    songBarState() {
      return this.$store.getters.getSongBarState
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
      color: #333333;
      padding-bottom: 10px;
      width: 100%;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
    }

    .artist {
      color: #888888;
      font-size: 24px;
    }
  }

  .play-list, .play-btn, .next-btn {
    // 播放列表
    flex: 0 0 90px;
    text-align: center;
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

</style>
