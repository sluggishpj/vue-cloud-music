<!-- 侧边栏 -->
<template>
  <div class="sidebar-container">
    <transition name="slide">
      <div class="sidebar" v-show="sidebarShow">
        <div class="header" v-if="!!profile" :style="headerBg">
          <div class="avatar">
            <img :src="profile.avatarUrl" @click="changeDisplayedUser(profile.userId)">
          </div>
          <div class="nick-level">
            <span class="nickname">{{profile.nickname}}</span>
            <span class="level ignore">Lv.{{ownUserInfo.level}}</span>
          </div>
          <span class="sign-in">签到</span>
        </div>
        <div class="memulist">
          <ul>
            <li><span class="icon-cloud-download"></span>我的音乐云盘</li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="bg-cover" @click="hideSidebar" v-show="sidebarShow"></div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    sidebarShow: false
  },
  computed: {
    ownUserInfo() {
      return this.$store.getters.getOwnUserInfo
    },
    headerBg() {
      return {
        backgroundImage: 'url(' + this.$store.getters.getOwnUserInfo.profile.backgroundUrl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    },
    profile() {
      return this.ownUserInfo.profile
    }
  },
  methods: {
    // 显示用户详情
    changeDisplayedUser(id) {
      this.hideSidebar()
      this.$store.dispatch('changeDisplayedUser', id)
      this.$router.push({ name: 'userinfo' })
    },
    hideSidebar() {
      this.$emit('hideSidebar') // 通知父组件隐藏本组件
    }
  }
}

</script>
<style lang="scss" scoped>
.sidebar {
  position: fixed;
  width: 80%;
  height: 100%;
  left: 0;
  top: 0;
  background: #F2F4F5;
  z-index: 70;
}

// 侧边栏滑出动画
// 左滑动画
.slide-enter,
.slide-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s linear;
}

// 含背景图片的div
.header {
  width: 100%;
  height: 310px;
  position: relative;
}

// 头像
.avatar {
  width: 120px;
  height: 120px;
  position: absolute;
  left: 20px;
  top: 80px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.nick-level {
  position: absolute;
  left: 20px;
  top: 230px;
  color: white; // 昵称
  .nickname {
    font-size: 28px;
  } // 等级
  .level {
    border: 1px solid #fff;
    padding: 0 10px;
    font-style: italic;
    border-radius: 16px;
    font-size: 24px;
  }
}

// 签到
.sign-in {
  position: absolute;
  right: 30px;
  bottom: 30px;
  color: white;
  font-size: 28px;
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 8px 10px;
}

// 下方列表
.memulist {
  padding-top: 40px;
  text-align: left;
  li {
    font-size: 28px;
    background: rgba(0, 0, 0, .1);
    padding: 30px;
    span {
      color: white;
      padding-right: 30px;
    }
  }
}

// 背面的遮罩
.bg-cover {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 65;
  background: rgba(0, 0, 0, .6);
}

.fade-enter,
.fade-leave-to {
  background: rgba(0, 0, 0, 0);
}

.fade-enter-active {
  animation: fade-in .3s linear;
}

.fade-leave-active {
  animation: fade-in .3s reverse;
}

@keyframes fade-in {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, .4);
  }
}

</style>
