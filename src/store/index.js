import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js' // 用户信息相关
import playlist from './modules/playlist.js' // 歌单列表相关
import song from './modules/song.js' // 播放歌曲相关

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    playlist,
    song
  }
})
