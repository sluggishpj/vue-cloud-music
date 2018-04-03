import api from '../../fetch/api.js'

const state = {
  ownUserInfo: {}, // 当前用户的信息
  ownUserID: '', // 当前用户的ID
  displayedUserInfo: {}, // 被显示的用户信息
  displayedUserID: '', // 被显示的用户的ID
  showUserDetail: false // 是否显示某用户详情
}

const getters = {
  getOwnUserInfo: state => state.ownUserInfo,
  getOwnUserID: state => state.ownUserID,
  getDisplayedUserInfo: state => state.displayedUserInfo,
  getDisplayedUserID: state => state.displayedUserID,
  isShowUserDetail: state => state.showUserDetail
}

const actions = {
  changeOwnUser({ state, commit }, id) {
    if (id === state.ownUserID) {
      return
    }
    if (id === state.displayedUserID) {
      commit('updateOwnUser', state.displayedUserInfo)
      return
    }

    // 获取自身用户详情
    api.getUserDetail(id)
      .then(res => {
        console.log('user detail res.data', res.data)
        commit('updateOwnUser', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  changeDisplayedUser({ state, commit }, id) {
    commit('toggleUserDetail')
    if (id === state.displayedUserID) {
      console.log('id === state.displayedUserID', id)
      return
    }
    if (id === state.ownUserID) {
      console.log('state.ownUserInfo', state.ownUserInfo)
      commit('updateDisplayedUser', state.ownUserInfo)
      return
    }

    // 获取待显示的用户详情
    api.getUserDetail(id)
      .then(res => {
        console.log('updateDisplayedUser res.data', res.data)
        commit('updateDisplayedUser', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const mutations = {
  // 更新本人
  updateOwnUser(state, userInfo) {
    state.ownUserInfo = userInfo
    this.ownUserID = userInfo.profile.userId
  },

  // 更新显示的用户
  updateDisplayedUser(state, userInfo) {
    state.displayedUserInfo = userInfo
    this.displayedUserID = userInfo.profile.userId
  },

  // 显示或关闭用户详情
  toggleUserDetail(state) {
    state.showUserDetail = !state.showUserDetail
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
