import Vue from 'vue'
import Router from 'vue-router'
import OnlineMusic from '@/components/onlinemusic/onlinemusic'
import Search from '@/components/search/search'
import PrivateFM from '@/components/privateFM/privateFM'
import DayRecommend from '@/components/dayrecommend/dayrecommend'
import Grin from '@/components/grin/grin'
import Heart from '@/components/heart/heart'
import UserInfo from '@/components/userinfo/userinfo' // 用户详情
import Userlist from '@/components/userlist/userlist' // 用户列表
import SongMenuDetail from '@/components/song-menu-detail/song-menu-detail' // 用户列表
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/online-music'
  },
  {
    path: '/online-music',
    name: 'online-music',
    component: OnlineMusic,
    children: [
      {path: '/private-fm', name: 'private-fm', component: PrivateFM},
      {path: '/day-recommend', name: 'day-recommend', component: DayRecommend}
    ]
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: UserInfo
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: Userlist
  },
  {
    path: '/song-menu-detail',
    name: 'song-menu-detail',
    component: SongMenuDetail
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/grin',
    name: 'grin',
    component: Grin
  },
  {
    path: '/heart',
    name: 'heart',
    component: Heart
  }
  ]
})
