<!-- 在线搜索 -->
<template>
  <div class="searchlist">
    <div class="fixed-head">
      <span @click="back" class="icon-arrow-left2 back-arrow"></span>
      <input v-model="searchWord" class="search-word" ref="searchWord">
      <span class="clear-all" @click="clearAll">×</span>
    </div>
    <songlist :tracks="searchSongList"></songlist>
  </div>
</template>
<script>
import songlist from '../songlist/songlist.vue'

export default {
  components: {
    songlist
  },

  data() {
    return {
      searchWord: '',
      searchSongList: []
    }
  },

  methods: {
    back() {
      // 隐藏搜索
      this.$router.back()
    },
    clearAll() {
      // 清空搜索词
      this.searchWord = ''
      this.$refs.searchWord.focus()
    }
  },

  beforeRouteEnter(to, from, next) {
    // 自动对焦
    next(vm => {
      vm.$refs.searchWord.focus()
    })
  }
}

</script>
<style lang="scss" scoped>
.searchlist {
  position: relative;
  left: 0;
  width: 100%;
  padding-top: 112px;
  z-index: 40;
  font-size: 32px;
}

.fixed-head {
  // 顶部固定导航条
  position: fixed;
  width: 100%;
  height: 112px;
  left: 0;
  top: 0;
  color: #fff;
  z-index: 30;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: stretch;
  .back-arrow {
    // 返回箭头
    width: 112px;
    height: 112px;
    flex: 0 0 112px;
    color: #000;
    font-size: 40px;
    line-height: 112px;
  }
  .search-word {
    // 关键字输入框
    flex: 1;
    height: 80%;
    border: none;
    padding: 0 10px;
    font-size: 32px;
    border-bottom: 1px solid #ccc;
    outline-style: none;
  }
  .clear-all {
    // 清空搜索词
    color: #000;
    font-size: 64px;
    flex: 0 0 112px;
  }
}

</style>
