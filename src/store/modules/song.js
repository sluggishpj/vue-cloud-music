// 当前播放歌的详情
import api from '../../fetch/api.js'

const state = {
  songID: '', // 当前播放歌的id
  songURL: '', // 当前播放的歌的URL
  songDetail: '', // 当前播放的歌的详细信息
  playing: false, // 当前是否正在播放
  songBarState: false, // 底部播放控制条
  playInterfaceState: false // 显示播放界面，一个盘子在转，含歌词
}

const getters = {
  getSongID: state => state.songID,
  getSongURL: state => state.songURL,
  getPlayState: state => state.playing,
  getSongDetail: state => state.songDetail,
  getSongBarState: state => state.songBarState,
  getInterfaceState: state => state.playInterfaceState
}

const actions = {
  // 更改正在播放的歌曲
  changePlayingSong({ state, commit }, id) {
    commit('updateSongID', id)
    commit('showSongBar')
    commit('beginPlaying')
    api.getSongURL(id)
      .then(res => {
        console.log('songURL', res.data)
        commit('updateSongURL', res.data.data[0].url)
      })

    api.getSongDetail(id)
      .then(res => {
        console.log('songDetail', res.data)
        commit('updateSongDetail', res.data.songs[0])
      })
  },

  // 下一首
  nextSong({ dispatch, state, commit, rootState }) {
    let tracks = rootState.playlistDetail.displayedListInfo.tracks
    let songID = state.songID
    for (let i = 0, len = tracks.length; i < len; i++) {
      if (tracks[i].id === songID) {
        if (i === len - 1) {
          // 最后一首
          dispatch('changePlayingSong', tracks[0].id)
        } else {
          dispatch('changePlayingSong', tracks[i + 1].id)
        }
        break
      }
    }
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

  // 更新歌曲详情
  updateSongDetail(state, detail) {
    state.songDetail = detail
  },

  togglePlayState(state) {
    state.playing = !state.playing
  },

  // 切换为播放状态
  beginPlaying(state) {
    state.playing = true
  },

  // 切换为暂停状态
  pausePlaying(state) {
    state.playing = false
  },

  // 切换底部播放条显示状态
  showSongBar(state) {
    state.songBarState = true
    console.log('show songbar')
  },
  hideSongBar(state) {
    state.songBarState = false
    console.log('hide songbar')
  },
  // 切换播放界面显示状态
  togglePlayInterface(state) {
    state.playInterfaceState = !state.playInterfaceState
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
