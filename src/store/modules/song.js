// 当前播放歌的详情
import api from '../../fetch/api.js'

const state = {
  songID: '', // 当前播放歌的id
  songURL: '', // 当前播放的歌的URL
  songDetail: '', // 当前播放的歌的详细信息
  playing: false, // 当前是否正在播放
  songBarShow: false, // 底部是否显示播放控制条
  playMode: 0, // 播放模式，0循环列表，1随机播放，2单曲循环
  currentTime: '', // 当前已播放时长
  duration: 0, // 歌曲总长
  targetTime: 0, // 目标时间
  progressBarDragging: false, // 是否正在拖拽进度
  volume: 0.6 // 音量
}

const getters = {
  getSongID: state => state.songID,
  getSongURL: state => state.songURL,
  getPlayState: state => state.playing,
  getSongDetail: state => state.songDetail,
  getSongBarShow: state => state.songBarShow,
  getPlayMode: state => state.playMode,
  getCurrentTime: state => state.currentTime,
  getDuration: state => state.duration,
  getTargetTime: state => state.targetTime,
  getProgressBarDragging: state => state.progressBarDragging,
  getVolume: state => state.volume
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

  // 上一首
  prevSong({ dispatch, state, commit, rootState }) {
    let tracks = rootState.playlist.displayedListInfo.tracks
    let songID = state.songID
    for (let i = 0, len = tracks.length; i < len; i++) {
      if (tracks[i].id === songID) {
        if (i === 0) {
          // 第一首
          dispatch('changePlayingSong', tracks[len - 1].id)
        } else {
          dispatch('changePlayingSong', tracks[i - 1].id)
        }
        break
      }
    }
  },

  // 下一首
  nextSong({ dispatch, state, commit, rootState }) {
    let tracks = rootState.playlist.displayedListInfo.tracks
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
  },

  // 随机播放
  randomSong({ dispatch, state, commit, rootState }) {
    let tracks = rootState.playlist.displayedListInfo.tracks
    let len = tracks.length
    let songID = state.songID
    let randomID = ''
    if (len > 1) {
      while ((randomID = tracks[Math.round(Math.random() * (len - 1))].id) === songID) {}
      dispatch('changePlayingSong', randomID)
    } else {
      dispatch('nextSong')
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
    state.songBarShow = true
    console.log('show songbar')
  },

  // 隐藏歌曲底部条
  hideSongBar(state) {
    state.songBarShow = false
    console.log('hide songbar')
  },

  // 改变播放模式
  changePlayMode(state) {
    state.playMode = (state.playMode + 1) % 3
  },

  // 改变当前进度时间
  changeCurrentTime(state, currentTime) {
    state.currentTime = currentTime
  },

  // 更新歌曲总时长
  updateDuration(state, duration) {
    state.duration = duration
  },

  // 更新目标时间
  changeTargetTime(state, targetTime) {
    state.targetTime = targetTime
  },

  // 更改拖拽状态
  changeProgressBarDragging(state, dragging) {
    state.progressBarDragging = dragging
  },

  // 改变音量大小
  changeVolume(state, volume) {
    state.volume = volume
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
