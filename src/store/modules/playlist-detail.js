// 当前播放的歌单详情和被显示的歌单详情
import api from '../../fetch/api.js'

const state = {
  playingListInfo: {}, // 当前播放的歌单列表详情
  displayedListInfo: {}, // 当前显示的歌单列表详情
  playingListID: '', // 当前播放的歌单列表ID
  displayedListID: '', // 当前显示的歌单列表ID
  showPlaylistDetail: false // 是否显示歌单详情
}

const getters = {
  getPlayingListInfo: state => state.playingListInfo,
  getDisplayedListInfo: state => state.displayedListInfo,
  getPlayigListID: state => state.playingListID,
  getDisplayedListID: state => state.displayedListID,
  showPlaylistDetail: state => state.showPlaylistDetail
}

const actions = {
  // 更改正在显示的歌曲列表
  changeDisplayedList({ state, commit }, id) {
    commit('togglePlaylistDetail')

    if (id === state.displayedListID) {
      // 还是当前显示的歌单列表
      return
    }

    commit('updateDisplayedListID', id)
    if (id === state.playingListID) {
      // 切换到当前播放的歌单列表
      commit('updateDisplayedListInfo', state.playingListInfo)
      return
    }

    api.getPlaylistDetail(id)
      .then(res => {
        commit('updateDisplayedListInfo', res.data.result)
        console.log('getPlaylistDetail', res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const mutations = {
  // 更改正在播放的歌单列表，因为切换只可能是当前显示的歌单列表，不需要再发送请求
  changePlayingList(state, id) {
    if (id === state.playingListID) {
      // 还是当前播放的歌单列表
      return
    }

    // 把当前播放列表切换为当前显示的歌单列表
    state.playingListID = id
    state.playingListInfo = state.displayedListInfo
  },

  // 更新显示的歌单列表id
  updateDisplayedListID(state, id) {
    state.displayedListID = id
  },

  // 更新显示的歌单列表详情
  updateDisplayedListInfo(state, info) {
    state.displayedListInfo = info
  },

  // 显示或关闭歌单详情
  togglePlaylistDetail(state) {
    state.showPlaylistDetail = !state.showPlaylistDetail
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
