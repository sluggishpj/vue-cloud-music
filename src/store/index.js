import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js'
import playlistDetail from './modules/playlist-detail.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    playlistDetail
  }
})
