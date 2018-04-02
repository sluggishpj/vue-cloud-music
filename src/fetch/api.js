import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

function doGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(res => {
        console.log(res)
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

function doPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, { params: params })
      .then(res => {
        console.log(res)
        resolve(res)
      })
      .catch(err => {
        console.log(err)
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
  getPlaylist(uid) {
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
  }
}
