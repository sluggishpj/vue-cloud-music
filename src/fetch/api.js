import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// // 拦截request,设置全局请求为ajax请求
// axios.interceptors.request.use((config) => {
//   config.headers['X-Requested-With'] = 'XMLHttpRequest'

//   return config
// })

function doGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function doPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, { params: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  // 获取用户详情
  getUserDetail(uid) {
    return doGet('/user/detail', {
      uid: uid
    })
  },

  // 获取用户歌单
  getUserPlaylist(uid) {
    return doGet('/user/playlist', {
      uid: uid
    })
  },

  // 登录，这里是错的，稍后改
  login(phone, password) {
    return doPost('/login/cellphone', {
      phone: phone,
      password: password
    })
  },

  // 获取B站排行榜图片
  getBilibiliPic() {
    return doGet('/pic/bilibili')
  },

  // 获取关注列表
  getFollows(uid) {
    return doGet('/user/follows', {
      uid: uid
    })
  },

  // 获取粉丝列表
  getFolloweds(uid) {
    return doGet('/user/followeds', {
      uid: uid
    })
  },

  // 获取歌单详情
  getPlaylistDetail(id) {
    return doGet('/playlist/detail', {
      id: id
    })
  },

  // 获取音乐URL
  getSongURL(id) {
    return doGet('/music/url', {
      id: id
    })
  }

}
