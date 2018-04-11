// 当前播放歌的详情
import api from '../../fetch/api.js'

const state = {
  songID: '', // 当前播放歌的id
  songURL: '', // 当前播放的歌的URL
  playing: false, // 当前是否正在播放
  showPlayBar: false, // 底部播放控制条
  showPlayInterface: false // 显示播放界面，一个盘子在转，含歌词
}

const getters = {
  getSongID: state => state.songID,
  getPlayState: state => state.playing
}

const actions = {
  // 更改正在播放的歌曲
  changePlayingSong({ state, commit }, id) {
    commit('updateSongID', id)
    api.getSongURL(id)
      .then(res => {
        console.log('songDetail', res.data)
        commit('updateSongURL', res.data.url)
      })
  }
}

const mutations = {
  // 更新歌曲ID
  updateSongID(state, id) {
    state.songID = id
  },

  // 更新歌曲URL
  updateSongURL(state, url) {
    state.songURL = url
  },

  // 切换播放状态
  togglePlayState(state) {
    state.playing = !state.playing
  },

  // 切换底部播放条显示状态
  togglePlayBar(state) {
    state.showPlayBar = !state.showPlayBar
  },

  // 切换播放界面显示状态
  togglePlayInterface(state) {
    state.showPlayInterface = !state.showPlayInterface
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
