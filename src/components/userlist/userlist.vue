<!-- 用户列表 -->
<template>
  <div class="userlist">
    <div class="header">
      <span class="back-arrow icon-arrow-left2" @click="hideUserlist"></span>
      <span class="title">{{userlistTitle}}</span>
    </div>
    <ul class="list">
      <li v-for="(item, index) in userlist" :key="index" @click="showUserInfo(item.userId)" class="list-item">
        <span class="icon">
            <img :src="item.avatarUrl">
          </span>
        <div class="item-detail">
          <div class="nick-gender">
            <span class="nickname">{{item.nickname}}</span>
            <span class="gender" v-show="item.gender" :class="{boy:item.gender===1,girl:item.gender===2}">{{item.gender === 1?'♂':'♀'}}</span>
          </div>
          <div class="signature" v-if="!!item.signature">{{item.signature}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import api from '../../fetch/api.js'
export default {
  methods: {
    hideUserlist() {
      // 箭头回退上一路由
      this.$router.go(-1)
      if (this.shouldShowUserDetail) {
        this.$store.commit('toggleUserDetail') // 显示用户详情
      }
    },
    showUserInfo(uid) {
      this.shouldShowUserDetail = false
      this.$store.dispatch('changeDisplayedUser', uid)
    }
  },
  data() {
    return {
      userlist: [],
      userlistTitle: '',
      shouldShowUserDetail: true // 按返回是否还显示用户详情
    }
  },

  beforeRouteEnter(to, from, next) {
    let type = to.query.userlistType
    let uid = to.query.uid
    if (type === 'follows') {
      // 关注
      api.getFollows(uid).then(res => {
        console.log('getFollows', res)
        next(vm => {
          vm.userlist = res.data.follow
          vm.userlistTitle = '关注'
          vm.shouldShowUserDetail = true
        })
      }).catch(err => {
        console.log(err)
      })
    } else if (type === 'followeds') {
      // 粉丝
      api.getFolloweds(uid).then(res => {
        console.log('getFolloweds', res)
        next(vm => {
          vm.userlist = res.data.followeds
          vm.userlistTitle = '粉丝'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  beforeRouteUpdate(to, from, next) {
    let type = to.query.userlistType
    let uid = to.query.uid
    this.shouldShowUserDetail = true
    if (type === 'follows') {
      // 关注
      api.getFollows(uid).then(res => {
        console.log('getFollows', res)
        this.userlist = res.data.follow
        this.userlistTitle = '关注'
      }).catch(err => {
        console.log(err)
      })
    } else if (type === 'followeds') {
      // 粉丝
      api.getFolloweds(uid).then(res => {
        console.log('getFolloweds', res)
        this.userlist = res.data.followeds
        this.userlistTitle = '粉丝'
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.userlist {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  background: #F2F4F5;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 30;

  .header {
    // 上方头部
    width: 100%;
    height: 112px;
    color: white;
    background: #FFF;
    position: fixed;
    left: 0;
    top: 0;
    color: #464646;
    z-index: 10;
    box-shadow: 0 1px 1px 0px #ccc;
    .back-arrow {
      // 返回箭头
      position: absolute;
      left: 0;
      top: 0;
      z-index: 50;
      width: 100%;
      display: flex;
      width: 88px;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    .title {
      display: flex;
      width: 88px;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding-left: 88px;
      text-align: left;
    }
  }

  .list {
    padding-top: 112px;
    .list-item {
      // 每一个用户
      display: block;
      position: relative;
      height: 128px;
      .icon {
        // 每一项的图标
        display: inline-block;
        width: 108px;
        height: 108px;
        border-radius: 50%;
        overflow: hidden;
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
        position: absolute;
        left: 150px;
        text-align: left;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: calc(100% - 160px);
        border-bottom: 1px solid #DADCDD;
        .nick-gender {
          // 用户名和性别
          color: #333333;
          padding: 10px 0 0;
          .girl {
            display: inline-block;
            color: #FF85B6;
            transform: rotateZ(45deg);
          }
          .boy {
            color: #41AADE;
          }
        }
        .signature {
          // 签名
          color: #888888;
          font-size: 20px;
          padding-top: 26px;
          overflow: hidden;
          white-space: nowrap; // 不换行
          text-overflow: ellipsis;
        }
      }
    }
  }
}

</style>
