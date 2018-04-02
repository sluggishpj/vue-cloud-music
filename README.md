## Build

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```



### 主要

- [vue](https://github.com/vuejs/vue)
- [vue-router](https://github.com/vuejs/vue-router)
- [axios](https://github.com/axios/axios)
- [vuex](https://github.com/vuejs/vuex)

### 插件

#### 滚动栏插件

[vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)



#### 图片懒加载

[Vue-Lazyload](https://github.com/hilongjw/vue-lazyload)



### 后台

[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)



### 组件安排

https://drive.google.com/file/d/14gbmPpj3AUd79jsaTsx3jB8RKHUVDU06/view?usp=sharing

#### 侧边栏

上一部分：

- 头像：头像点击进入个人信息组件
- 背景
- 昵称
- 等级
- 签到否

#### 主界面

##### 滚动图

##### 三个路由

- 私人FM

- 每日歌曲推荐

- 云音乐热歌榜

  ​

##### 推荐歌单

点击直接进入歌单列表



#### 公用组件

##### 歌单详情

- 头部
- 中部
- 歌曲列表组件

##### 播放歌曲界面

- 头部
- 中部
  - 旋转图片或
  - 声音大小+歌词
- 进度条
- 切换听歌模式/上一曲/暂停/下一曲

##### 歌单列表



##### 歌曲列表



##### 用户列表



##### 个人信息

- 关注+粉丝：用户列表组件
- 歌单列表组件



## 从0开始的云音乐

### 初始化

原文: https://www.w3cplus.com/mobile/vw-layout-in-vue.html

- 全局先按照vue-cli

```bash
$ npm install -g vue-cli
```

- 初始化项目

```bash
vue init webpack vue-cloud-music
```

* 安装以下几个PostCSS插件

  * [postcss-aspect-ratio-mini](https://github.com/yisibl/postcss-aspect-ratio-mini)：处理元素容器宽高比
  * [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)：把px单位转换为`vw`、`vh`、`vmin`或`vmax`
  * [postcss-write-svg](https://github.com/jonathantneal/postcss-write-svg)：用来处理移动端1px的相关处理
  * [postcss-cssnext](https://github.com/MoOx/postcss-cssnext)：使用CSS未来的特性
  * [cssnano](https://github.com/ben-eb/cssnano)：用来压缩和清理CSS代码
  * [postcss-viewport-units](https://github.com/springuper/postcss-viewport-units)：给CSS的属性添加`content`的属性，配合[`viewport-units-buggyfill`](https://github.com/rodneyrehm/viewport-units-buggyfill)库给`vw`、`vh`、`vmin`和`vmax`做适配

  在`.postcssrc.js`对新安装的PostCSS插件进行配置

```js
module.exports = {
    'plugins': {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-aspect-ratio-mini': {},
        'postcss-write-svg': { utf8: false },
        'postcss-cssnext': {},
        'postcss-px-to-viewport': {
            viewportWidth: 750, // 视窗的宽度，对应的是设计稿的宽度，一般750
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度
            unitPrecision: 3, // 指定px转换为视窗单位的小数位数
            viewportUnit: 'vw', // 指定需要转换成的视窗单位
            selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义
            minPixelValue: 1, // 小于或等于1px不转换为视窗单位
            mediaQuery: false // 允许在媒体查询中转换px
        },
        'postcss-viewport-units': {},
        'cssnano': {
            preset: 'advanced',
            autoprefixer: false,
            'postcss-zindex': false
        }
    }
}
```

> 由于`cssnext`和`cssnano`都具有`autoprefixer`,事实上只需要一个，所以把默认的`autoprefixer`删除掉，然后把`cssnano`中的`autoprefixer`设置为`false`。



* 在Vue项目中的index.html引入`viewport`的polyfill：[Viewport Units Buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)。并在文件中调用

```html
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
<script>
    widow.onload = function() {
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
    }
</script>
```

> `content`可能会引起一定的副作用，比如`img`和伪元素`::before`或`::after`在`img`中`content`会引起部分浏览器下，图片不会显示，需要在全局添加
>
> ```css
> img {
>     content: normal !important;
> }
> ```
>
> 对于`::after`之类的，`viewport-units-buggyfill`对其不会起作用



* 要使用sass，需安装`node-sass`和`sass-loader`

```bash
npm install node-sass sass-loader --save-dev
```


## 学到的知识点
1. 使用`:style`为元素动态添加背景图片地址

```vue
<div class="header" :style="headerBg">
</div>

<script>
  // ...
  data() {
    return {
      headerBg: {}
    }
  },
  mounted() {
    api.getUserDetail('278946928')
      .then(res => {
        this.profile = res.data.profile
        this.headerBg = {
          backgroundImage: 'url(' + this.profile.backgroundUrl + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
</script>
```


