<!-- 用户详情页 -->
<template>
  <transition name="fade">
    <div class="user-info" v-show="isShowUserDetail">
      <div class="back-arrow"><span @click="toggleUserDetail"><img src="../../assets/back.png" height="16" width="16" alt=""></span></div>
      <div class="header" :style="headerBg" v-if="!!profile">
        <div class="avatar">
          <img :src="profile.avatarUrl">
        </div>
        <div class="nick-level">
          <span class="nickname">{{profile.nickname}}</span>
          <span class="gender" v-show="profile.gender">{{profile.gender === 1?'♂':'♀'}}</span>
          <span class="level">Lv.{{userInfo.level}}</span>
        </div>
        <!-- 动态关注粉丝3按钮 -->
        <div class="tab">
          <div class="tab-item">
            <span class="title">动态</span><span>{{profile.eventCount}}</span>
          </div>
          <div class="tab-item" @click="showUserlist('follows',uid)">
            <span class="title">关注</span><span>{{profile.follows}}</span>
          </div>
          <div class="tab-item">
            <span class="title" @click="showUserlist('followeds',uid)">粉丝</span><span>{{profile.followeds}}</span>
          </div>
        </div>
      </div>
      <!-- 歌单列表 -->
      <playlist :uid="uid"></playlist>
      <!-- 用户列表 -->
      <userlist :userlist-show="userlistShow" :userlist="userlist" :userlist-title="userlistTitle" @hideUserlist="hideUserlist"></userlist>
    </div>
  </transition>
</template>
<script>
import playlist from '../playlist/playlist.vue'
import userlist from '../userlist/userlist.vue'
import api from '../../fetch/api.js'

export default {
  components: {
    playlist,
    userlist
  },
  data() {
    return {
      userlistShow: false,
      userlistTitle: '',
      userlist: []
    }
  },
  computed: {
    isShowUserDetail() {
      return this.$store.getters.isShowUserDetail
    },
    userInfo() {
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
      return this.userInfo.profile
    },
    uid() {
      console.log('this.$store.getters.getDisplayedUserID', this.$store.getters.getDisplayedUserID)
      return this.$store.getters.getDisplayedUserID
    }
  },

  methods: {
    toggleUserDetail() {
      this.$store.commit('toggleUserDetail')
    },
    hideUserlist() {
      this.userlistShow = false
    },
    showUserlist(type, uid) {
      this.userlistShow = true
      if (type === 'follows') {
        // 关注
        this.userlistTitle = '关注'
        api.getFollows(uid).then((res) => {
          console.log('getFollows', res)
          this.userlist = res.data.follow
        })
      } else if (type === 'followeds') {
        // 粉丝
        this.userlistTitle = '粉丝'
        api.getFolloweds(uid).then((res) => {
          console.log('getFolloweds', res)
          this.userlist = res.data.followeds
        })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.user-info {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 574px;
  z-index: 40;
  background: yellow;
  .back-arrow {
    // 返回箭头
    position: fixed;
    left: 0;
    top: 0;
    color: #fff;
    z-index: 50;
    width: 100%;
    height: 88px; // background: rgba(0, 0, 0, .1);
    text-align: left;
    span {
      display: flex;
      width: 88px;
      height: 90%;
      justify-content: center;
      align-items: center;
    }
  }

  .header {
    // 上方头部
    width: 100%;
    height: 600px;
    color: white;
    background: #ccc;
    position: relative;

    .avatar {
      // 头像
      position: absolute;
      left: 40px;
      bottom: 150px;
      width: 136px;
      height: 136px;
      border-radius: 50%;
      border: 1px solid #FFF;
      overflow: hidden;
      img {
        width: 106%;
        height: 106%;
      }
    }

    .nick-level {
      position: absolute;
      left: 200px;
      bottom: 200px;
      color: white;
      .nickname {
        // 昵称
        font-size: 28px;
        padding-right: 6px;
      }
      .gender {
        // 性别
        color: #FFF;
        background: #47A1CE;
        width: 32px;
        height: 32px;
        font-size: 20px;
        padding: 0 6px;
        border-radius: 50%;
      }
      .level {
        // 等级
        border: 1px solid #fff;
        padding: 0 8px;
        font-style: italic;
        border-radius: 16px;
        font-size: 20px;
      }
    }

    .tab {
      // 底部动态，关注，粉丝3选项
      position: absolute;
      display: flex;
      justify-content: stretch;
      width: 100%;
      bottom: 0;
      height: 88px;
      background: rgba(0, 0, 0, .3);

      .tab-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        span {
          padding: 4px;
        }
        .title {
          color: #A0A2A5;
        }
      }
    }
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all linear .3s;
}

</style>
