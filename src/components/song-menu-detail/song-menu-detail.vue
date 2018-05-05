<!-- 歌单详情 -->
<template>
  <div class="songmenu-detail" v-if="listInfo">
    <div class="header">
      <img :src="listInfo.coverImgUrl" class="backdrop">
      <div class="fixed-head">
        <span @click="back" class="icon-arrow-left2 back-arrow"></span>
        <span class="name">歌单</span>
        <span class="icon-search search" @click="showSearchList"></span>
      </div>
      <div class="list-info">
        <div class="cover">
          <img :src="listInfo.coverImgUrl">
        </div>
        <div class="list-detail" v-if="listInfo.creator">
          <div class="name">{{listInfo.name}}</div>
          <div class="user-info" @click="showUserDetail(listInfo.creator.userId)">
            <span class="avatar">
              <img :src="listInfo.creator.avatarUrl">
            </span>
            <span class="nickname">{{listInfo.creator.nickname}} ></span>
          </div>
        </div>
      </div>
      <div class="tab">
        <div class="tab-item">
          <span class="title">收藏</span>
          <span class="count">{{listInfo.subscribedCount}}</span>
        </div>
        <div class="tab-item">
          <span class="title">播放</span>
          <span class="count">{{listInfo.playCount}}</span>
        </div>
      </div>
    </div>
    <div class="play-all">
      <span class="icon-play2 play-btn"></span>
      <span class="title">播放全部<span class="count">(共{{listInfo.trackCount}}首)</span></span>
    </div>

    <!-- 歌曲列表 -->
    <songlist :tracks="listInfo.tracks"></songlist>

    <!-- 本地搜索 -->
    <scroll-lock class="lock-div" v-if="searchListShow" :lock="true" :bodyLock="true">
      <local-search :tracks="listInfo.tracks" @hideSearchList="hideSearchList"></local-search>
    </scroll-lock>
  </div>
</template>
<script>
import songlist from '../songlist/songlist.vue'
import localSearch from '../local-search/local-search.vue'

export default {
  components: {
    songlist,
    'local-search': localSearch
  },
  data() {
    return {
      searchListShow: false
    }
  },

  computed: {
    listInfo() {
      return this.$store.getters.getDisplayedListInfo
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    showUserDetail(uid) {
      this.$router.push({
        name: 'userinfo'
      })
      this.$store.dispatch('changeDisplayedUser', uid) // 显示具体用户
    },
    showSearchList() {
      this.searchListShow = true
    },
    hideSearchList() {
      this.searchListShow = false
    }
  }
}

</script>
<style lang="scss" scoped>
.songmenu-detail {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 43;
  width: 100%;
  background: #F2F4F5;
  min-height: 100%;
  font-size: 32px;
  .header {
    width: 100%;
    height: 510px;
    position: relative;
    overflow: hidden;
    .backdrop {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 510px;
      z-index: -1;
      filter: blur(50px);
    }
    .fixed-head {
      // 顶部固定导航条
      position: fixed;
      width: 100%;
      height: 112px;
      left: 0;
      top: 0;
      color: #fff;
      z-index: 20;
      background: rgba(0, 0, 0, .2);
      .back-arrow {
        // 返回箭头
        width: 112px;
        height: 112px;
        float: left;
        font-size: 40px;
        line-height: 112px;
      }
      .name {
        // 歌单名
        float: left;
        line-height: 112px;
      }
      .search {
        // 搜素按钮
        width: 112px;
        float: right;
        line-height: 112px;
      }
    }

    .list-info {
      // 固定条下的歌单信息
      width: 100%;
      height: 278px;
      padding-top: 112px;
      .cover {
        // 歌单封面
        width: 254px;
        height: 254px;
        padding: 14px 40px;
        position: relative;
        float: left;
        img {
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
      }

      .list-detail {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start; // 歌单信息
        .name {
          // 歌单名
          color: #FFF;
          padding-bottom: 40px;
        }
        .user-info {
          display: flex;
          align-items: center;
          .avatar {
            // 用户头像
            display: inline-block;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .nickname {
            // 用户昵称
            display: inline-block;
            color: #E5E7EB;
            font-size: 28px;
            height: 54px;
            line-height: 54px;
            padding-left: 10px;
          }
        }
      }
    }

    .tab {
      display: flex;
      justify-content: stretch;
      width: 100%;
      height: 114px;
      font-size: 28px;
      .tab-item {
        color: #FFF;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          padding: 6px;
        }
      }
    }
  }

  .play-all {
    // 播放全部
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
  } // 搜索列表
  .lock-div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #F2F4F5;
    height: 100vh;
    z-index: 50;
    overflow: scroll;
  }
}

</style>
