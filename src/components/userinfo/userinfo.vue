<!-- 用户详情页 -->
<template>
  <div class="user-info" v-show="isShowUserDetail">
    <div class="back-arrow">←</div>
    <div class="header" :style="headerBg" v-if="!!profile">
      <div class="avatar">
        <img :src="profile.avatarUrl">
      </div>
      <div class="nick-level">
        <span class="nickname">{{profile.nickname}}</span>
        <span class="gender" v-show="profile.gender">{{profile.gender === 1?'♂':'♀'}}</span>
        <span class="level ignore">Lv.{{userInfo.level}}</span>
      </div>
      <!-- 动态关注粉丝3按钮 -->
      <div class="tab">
        <div class="tab-item">
          <span>动态</span><span>{{profile.eventCount}}</span>
        </div>
        <div class="tab-item">
          <span>关注</span><span>{{profile.follows}}</span>
        </div>
        <div class="tab-item">
          <span>粉丝</span><span>{{profile.followeds}}</span>
        </div>
      </div>
      <div class="self-playlist">
        <span class="title">歌单({{profile.playlistCount}})</span>
        <ul>
          <li v-for="(item, index) in playlist" :key="index" @click="showPlaylistInfo(item.id)">
            <span class="icon">
              <img :src="item.coverImgUrl">
            </span>
            <span class="title">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="other-playlist">
        <span class="title">收藏的歌单({{profile.playlistBeSubscribedCount}})</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../fetch/api.js'

export default {
  data() {
    return {
      playlist: []
    }
  },
  computed: {
    isShowUserDetail() {
      return this.$store.getters.isShowUserDetail
    },
    userInfo() {
      console.log('userinfo', this.$store.getters.getDisplayedUserInfo)
      return this.$store.getters.getDisplayedUserInfo
    },
    headerBg() {
      return {
        backgroundImage: 'url(' + this.$store.getters.getDisplayedUserInfo.profile.backgroundUrl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    },
    profile() {
      return this.$store.getters.getDisplayedUserInfo.profile
    }
  },

  mounted() {
    // 获取用户歌单列表
    api.getUserPlaylist(this.userID)
      .then(res => {
        console.log('user playlist', res.data.playlist)
        this.playlist = res.data.playlist
      })
      .catch(err => {
        console.log(err)
      })
  }
}

</script>

<style lang="scss" scoped>
  .user-info {
    position: fixed;
    left: 0;
    width: 100%;
    height: 500px;
    z-index: 40;
    background: yellow;

    .back-arrow {
      position: fixed;
      left: 0;
      top: 0;
    }
    .header {
      width: 100%;
      height: 600px;
      color: white;
      background: #ccc;

      .avatar {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

</style>
