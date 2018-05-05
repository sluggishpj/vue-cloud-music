<!-- 顶部5个按钮 -->
<template>
  <div class="header">
    <div class="btns">
      <!-- 侧边栏按钮 -->
      <div class="side-menu" @click="sidebarShow = !sidebarShow">
        <span class="icon-th-menu"></span>
      </div>
      <!-- 中间三路由 -->
      <div class="main-menu">
        <div class="online-music">
          <router-link to="online-music">
            <span class="icon-music"></span>
          </router-link>
        </div>
        <div class="heart">
          <router-link to="heart">
            <span class="icon-heart"></span>
          </router-link>
        </div>
        <div class="grin">
          <router-link to="grin">
            <span class="online-music icon-grin"></span>
          </router-link>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="search-menu">
        <router-link to="online-search">
          <span class="icon-search"></span>
        </router-link>
      </div>
    </div>
    <sidebar :sidebar-show="sidebarShow" @hideSidebar="hideSidebar" :ownID="ownID"></sidebar>
  </div>
</template>
<script>
import sidebar from '../sidebar/sidebar.vue'

export default {
  components: {
    sidebar
  },
  data() {
    return {
      sidebarShow: false,
      ownID: '46088643'
    }
  },
  methods: {
    // 隐藏侧边栏
    hideSidebar() {
      this.sidebarShow = false
    }
  }
}

</script>
<style lang="scss" scoped>
$header-height: 92px;

.btns {
  width: 750px;
  height: $header-height;
  background: white;
  font-size: 32px;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 1px 0px #ccc;
}

.side-menu,
.main-menu,
.search-menu {
  display: flex;
  flex: 1;
  line-height: $header-height;
  a {
    display: inline-block;
    width: 100%;
  }
}

.side-menu {
  flex: 0 1 80px;
  justify-content: center;
  span {
    line-height: $header-height;
  }
}

.main-menu {
  justify-content: center;
  div {
    flex: 0 1 100px;
    line-height: $header-height;
  }
}

.search-menu {
  flex: 0 1 100px;
  justify-content: center;
}

</style>
