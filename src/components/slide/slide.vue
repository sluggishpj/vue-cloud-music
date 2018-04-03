<!-- 个性推荐里的滚动栏 -->
<template>
  <div class="slide">
    <swiper :options="swiperOption" ref="mySwiper" v-if="picItems.length">
      <swiper-slide v-for="item in picItems" :key="item.doc_id">
        <img :src="item.pictures[0].img_src" class="swiper-lazy" rel="noreferrer">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '../../fetch/api.js'

export default {
  name: 'slide',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true, // 无限循环
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }, // 自动播放
        lazy: true, // 图片懒加载
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      },
      picItems: []
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // 获取B站图片
    api.getBilibiliPic().then((res) => {
      res.data.data.items.forEach((item) => {
        this.picItems.push(item.item)
      })
      console.log(this.picItems)
    })

    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // this.swiper.slideTo(3, 1000, false)
  }
}

</script>
<style lang="scss">
.swiper-slide {
  text-align: center;
  height: 400px;
  img {
    width: 100%;
    height: auto;
  }
}

</style>
