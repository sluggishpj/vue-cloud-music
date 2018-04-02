<!-- 侧边栏 -->
<template>
  <transition name="slide">
    <div class="sidebar" v-show="sidebarShow">
      <div class="header" :style="headerBg">
        <div class="avatar">
          <img :src="profile.avatarUrl">
        </div>
        <div class="nick-level">
          <span class="nickname">{{profile.nickname}}</span>
          <span class="level ignore">Lv.{{resData.level}}</span>
        </div>
        <span class="sign-in">签到</span>
      </div>
      <div class="memulist">
        <ul>
          <li><span class="icon-cloud"></span>我的音乐云盘</li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import api from '../../fetch/api.js'
export default {
  props: {
    sidebarShow: false
  },
  data() {
    return {
      profile: {},
      resData: {},
      headerBg: {}
    }
  },
  mounted() {
    api.getUserDetail('46088643')
      .then(res => {
        this.resData = res.data
        this.profile = res.data.profile
        this.headerBg = {
          backgroundImage: 'url(' + this.profile.backgroundUrl + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }
      })
      .catch(err => {
        console.log(err)
      })
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
  background: white;
  z-index: 20;
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

@keyframes slide-out {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
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

</style>
