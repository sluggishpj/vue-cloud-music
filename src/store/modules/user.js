import api from '../../fetch/api.js'

const state = {
  ownUserInfo: {}, // 当前用户的信息
  displayedUserInfo: {}, // 被显示的用户信息
  ownUserID: '', // 当前用户的ID
  displayedUserID: '', // 被显示的用户的ID
  showUserDetail: false // 是否显示某用户详情
}

const getters = {
  getOwnUserInfo: state => state.ownUserInfo,
  getDisplayedUserInfo: state => state.displayedUserInfo,
  getOwnUserID: state => state.ownUserID,
  getDisplayedUserID: state => state.displayedUserID,
  isShowUserDetail: state => state.showUserDetail
}

const actions = {
  // 更改当前用户
  changeOwnUser({ state, commit }, id) {
    if (id === state.ownUserID) {
      return
    }
    commit('updateOwnUserID', id)
    if (id === state.displayedUserID) {
      commit('updateOwnUserInfo', state.displayedUserInfo)
      return
    }

    // 获取自身用户详情
    api.getUserDetail(id)
      .then(res => {
        console.log('user detail res.data', res.data)
        commit('updateOwnUserInfo', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 更改显示的用户
  changeDisplayedUser({ state, commit }, id) {
    commit('toggleUserDetail')
    if (id === state.displayedUserID) {
      // id一致，不用修改
      return
    }
    commit('updateDisplayedUserID', id)
    if (id === state.ownUserID) {
      // id为本用户，复制本用户信息
      commit('updateDisplayedUserInfo', state.ownUserInfo)
      return
    }

    // 获取待显示的用户详情
    api.getUserDetail(id)
      .then(res => {
        console.log('updateDisplayedUserInfo res.data', res.data)
        commit('updateDisplayedUserInfo', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const mutations = {
  // 更新本人信息
  updateOwnUserInfo(state, userInfo) {
    state.ownUserInfo = userInfo
  },

  // 更新本人ID
  updateOwnUserID(state, id) {
    state.ownUserID = id
  },

  // 更新被显示的用户id
  updateDisplayedUserID(state, id) {
    state.displayedUserID = id
  },

  // 更新被显示的用户信息
  updateDisplayedUserInfo(state, userInfo) {
    state.displayedUserInfo = userInfo
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
