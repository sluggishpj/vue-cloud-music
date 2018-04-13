<!-- 歌单列表 -->
<template>
  <div class="play-list" v-if="playlist && playlist.length && profile && playlistShow">
    <div class="self-playlist">
      <span class="title">歌单({{profile.playlistCount}})</span>
      <ul>
        <li class="list-item">
          <span class="icon">
            <img src="../../assets/rank.png">
          </span>
          <span class="item-detail">
            <span class="item-name">{{author}}听歌排行</span>
          <span class="item-count">累计听歌{{userInfo.listenSongs}}首</span>
          </span>
        </li>
        <li v-for="(item, index) in selfPlaylist" :key="index" @click="showPlaylistDetail(item.id)" class="list-item">
          <span class="icon">
            <img :src="item.coverImgUrl">
          </span>
          <span class="item-detail">
            <span class="item-name">{{item.name}}</span>
          <span class="item-count">{{item.trackCount}}首 播放{{item.playCount}}次</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="other-playlist" v-if="subscribedCount">
      <span class="title">收藏的歌单({{subscribedCount}})</span>
      <ul>
        <li v-for="(item, index) in otherPlaylist" :key="index" @click="showPlaylistDetail(item.id)" class="list-item">
          <span class="icon">
            <img :src="item.coverImgUrl">
          </span>
          <span class="item-detail">
            <span class="item-name">{{item.name}}</span>
          <span class="item-count">{{item.trackCount}}首 by {{item.creator.nickname}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import api from '../../fetch/api.js'

export default {
  props: {
    uid: '',
    playlistShow: false
  },

  data() {
    return {
      playlist: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getDisplayedUserInfo
    },
    profile() {
      return this.userInfo.profile
    },
    selfPlaylist() { // 自己创建的歌单
      return this.playlist.filter(item => {
        return item.userId === this.uid
      })
    },
    otherPlaylist() { // 收藏的歌单
      return this.playlist.filter(item => {
        return item.userId !== this.uid
      })
    },
    author() { // 更新当前作者
      if (this.uid !== this.$store.getters.getOwnUserID.toString()) {
        return this.profile.nickname
      } else {
        return '我的'
      }
    },
    subscribedCount() {
      return this.otherPlaylist.length
    }
  },
  watch: {
    uid() {
      // 获取用户歌单列表
      api.getUserPlaylist(this.uid)
        .then(res => {
          console.log('user playlist', res.data.playlist)
          this.playlist = res.data.playlist
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  methods: {
    showPlaylistDetail(id) { // 显示歌单详情
      this.$store.commit('toggleUserDetail')
      this.$store.dispatch('changeDisplayedList', id)
    }
  }
}

</script>
<style lang="scss" scoped>
.play-list {
  position: relative;
  width: 100%;
  background: #F2F4F5;
  .title {
    // 歌单，收藏的歌单
    display: block;
    font-size: 28px;
    color: #888888;
    height: 54px;
    line-height: 54px;
    text-align: left;
    padding-left: 20px;
    background: #ECEEEF;
  }
  .list-item {
    // 每一项歌单
    display: block;
    position: relative;
    height: 128px;
    .icon {
      // 每一项的图标
      display: inline-block;
      width: 108px;
      height: 108px;
      position: absolute;
      left: 20px;
      top: 10px;
      img {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
      }
    }

    .item-detail {
      // 每一项右边的文字
      text-align: left;
      display: block;
      padding-left: 150px;
      .item-name {
        // 歌单名
        display: block;
        font-size: 32px;
        padding: 30px 0px 10px;
      }
      .item-count {
        // 歌曲数，播放数
        color: #888888;
        font-size: 20px;
        padding: 14px 0px 18px;
        display: block;
        border-bottom: 1px solid #DADCDD;
      }
    }
  }
}

</style>
