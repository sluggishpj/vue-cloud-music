<!-- 用户列表 -->
<template>
  <div class="userlist" v-if="userlistShow">
    <div class="header">
      <span class="back-arrow" @click="hideUserlist"><img src="../../assets/back.png"></span>
      <span class="title">{{userlistTitle}}</span>
    </div>
    <ul>
      <li v-for="(item, index) in userlist" :key="index" @click="showUserInfo(item.userId)" class="list-item">
        <span class="icon">
            <img :src="item.avatarUrl">
          </span>
        <div class="item-detail">
          <div class="nick-gender">
            <span class="nickname">{{item.nickname}}</span>
            <span class="gender" v-show="item.gender">{{item.gender === 1?'♂':'♀'}}</span>
          </div>
          <div class="signature">{{item.signature}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    userlistShow: false,
    userlist: '',
    userlistTitle: ''
  },
  methods: {
    hideUserlist() {
      this.$emit('hideUserlist')
    }
  }
}

</script>
<style lang="scss" scoped>
.userlist {
  width: 100%;
  min-height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background: white;
  z-index: 50;
  overflow: scroll;

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
  }

  .header {
    // 上方头部
    width: 100%;
    height: 88px;
    color: white;
    background: #ccc;
    position: relative;
  }
}

</style>
