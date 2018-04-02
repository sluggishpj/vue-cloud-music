import Vue from 'vue'
import Router from 'vue-router'
import OnlineMusic from '@/components/onlinemusic/onlinemusic'
import Search from '@/components/search/search'
import PrivateFM from '@/components/privateFM/privateFM'
import DayRecommend from '@/components/dayrecommend/dayrecommend'
import Grin from '@/components/grin/grin'
import Heart from '@/components/heart/heart'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/onlinemusic'
  },
  {
    path: '/onlinemusic',
    component: OnlineMusic,
    children: [
      {path: '/privateFM', component: PrivateFM},
      {path: '/dayrecommend', component: DayRecommend}
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/grin',
    component: Grin
  },
  {
    path: '/heart',
    component: Heart
  }
  ]
})
