<!-- 搜索 -->
<template>
  <div class="searchlist">
    <div class="fixed-head">
      <span @click="hideSearchList" class="icon-arrow-left2 back-arrow"></span>
      <input v-model.trim="searchWord" class="search-word" ref="searchWord">
      <span class="clear-all" @click="clearAll">×</span>
    </div>
    <ul class="list">
      <li class="list-item" v-for="(item, idx) in searchSongList" :key="idx" @click="playSong(item.id)">
        <span class="serial-num" :class="{'icon-volume-medium':item.id===playingSongID}">{{item.id===playingSongID?'':(idx+1)}}</span>
        <div class="item-detail">
          <div class="name">{{item.name}}</div>
          <div class="artist-album">
            <span class="artists" v-for="(artist, idx) in item.artists" :key="idx">{{artist.name}} </span>
            <span class="album">- {{item.album.name}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    playingSongID: ''
  },
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {
    hideSearchList() {
      this.$emit('hideSearchList')
    },
    clearAll() {
      // 清空搜索词
      this.searchWord = ''
      this.$refs.searchWord.focus()
    },
    playSong(id) {
      // 切歌
      this.$store.dispatch('changePlayingSong', id)
    }
  },
  computed: {
    // 根据关键字过滤歌单中的歌曲
    searchSongList() {
      let searchWord = this.searchWord.toLowerCase()
      if (!searchWord) {
        return []
      } else {
        return this.tracks.filter(item => {
          return item.name.toLowerCase().indexOf(searchWord) !== -1 ||
            item.artists.some(artist => {
              return artist.name.toLowerCase().indexOf(searchWord) !== -1
            }) ||
            item.album.name.toLowerCase().indexOf(searchWord) !== -1
        })
      }
    }
  },
  mounted() {
    // 自动对焦
    this.$refs.searchWord.focus()
  }
}

</script>
<style lang="scss" scoped>
.searchlist {
  position: relative;
  left: 0;
  width: 100%;
  padding-top: 112px;
  background: #FFF;
  z-index: 40;
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
    flex: 1;
    height: 80%;
    border: none;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    outline-style: none;
  }
  .clear-all {
    color: #000;
    font-size: 64px;
    flex: 0 0 112px;
  }
}

.list-item {
  display: flex;
  position: relative;
  align-items: center;
  height: 128px;
  width: 100%;
  .serial-num {
    color: #999999;
    flex: 0 0 110px;
    &.icon-volume-medium {
      color: #CE3D3E;
    }
  }
  .item-detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    white-space: nowrap;
    border-bottom: 1px solid #DADCDD;
    overflow: hidden;
    .name {
      // 歌名
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
    }
    .artist-album {
      // 作者及唱片
      width: 100%;
      padding-top: 20px;
      font-size: 24px;
      color: #999999;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
    }
  }
}

</style>
