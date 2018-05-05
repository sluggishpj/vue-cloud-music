<!-- 用户详情页 -->
<template>
  <transition name="fade">
    <div class="user-info" :class="{'songbar-padding':songBarShow}" ref="userInfo">
      <div class="back-arrow"><span @click="back" class="icon-arrow-left2"></span></div>
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
        <div class="tab" v-if="uid">
          <div class="tab-item">
            <span class="title">动态</span><span>{{profile.eventCount}}</span>
          </div>
          <div @click="showUserlist({uid: uid, userlistType:'follows'})" class="tab-item">
            <span class="title">关注</span><span>{{profile.follows}}</span>
          </div>
          <div @click="showUserlist({uid: uid, userlistType:'followeds'})" class="tab-item">
            <span class="title">粉丝</span><span>{{profile.followeds}}</span>
          </div>
        </div>
      </div>
      <!-- 歌单列表 -->
      <song-menu-list :uid="uid"></song-menu-list>
    </div>
  </transition>
</template>
<script>
import songMenuList from '../song-menu-list/song-menu-list.vue'

export default {
  components: {
    songMenuList
  },
  data() {
    return {
      headerBarBg: {
        background: 'rgba(0, 0, 0, .05)'
      }
    }
  },
  computed: {
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
      return this.$store.getters.getDisplayedUserID
    },
    songBarShow() {
      return this.$store.getters.getSongBarShow
    }
  },

  methods: {
    showUserlist(detail) {
      this.$router.push({
        name: 'userlist',
        params: detail
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}

</script>
<style lang="scss" scoped>
.user-info {
  position: absolute;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background: #f2f4f5;
  .back-arrow {
    // 返回箭头
    position: fixed;
    font-size: 32px;
    left: 0;
    top: 0;
    color: #fff;
    z-index: 10;
    width: 100%;
    height: 112px;
    background: rgba(0, 0, 0, .05);
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
      z-index: 10;

      .tab-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        z-index: 20;
        span {
          padding: 4px;
        }
        .title {
          color: #E0E0D8;
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
