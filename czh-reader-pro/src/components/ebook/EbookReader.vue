<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div
      class="ebook-reader-mask"
      @click="onmaskclick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mouseup.left="onMouseEnd"
      @mousemove="onMouseMove"></div>
  </div>
</template>

<script>
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from '../../utils/localStorage'
import {
  ebookMixin
} from '../../utils/mixin'
import Epub from 'epubjs'
import {
  flatten
} from '../../utils/book'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    //阶段1 - 鼠标进入
    //阶段2 - 鼠标进入后 移动
    //阶段3 - 鼠标移动后 松手
    //阶段4 - 鼠标还原
    onMouseEnter(e) {
      this.mouseState = 1
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseEnd(e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0)
        this.firstOffsetY = null
        this.mouseState = 3
      } else {
        this.mouseState = 4
      }
      const time = e.timeStamp - this.mouseStartTime
      if (time < 100) {
        this.mouseState = 4
      }
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseMove(e) {
      if (this.mouseState === 1) {
        this.mouseState = 2
      } else if (this.mouseState === 2) {
        let offsetY = 0
        if (this.firstOffsetY) {
          //获取Y轴偏移量
          offsetY = e.clientY - this.firstOffsetY
          //传入vueX
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.clientY
        }
      }
      e.preventDefault()
      e.stopPropagation()
    },
    move(e) {
      //设置初始Y为0
      let offsetY = 0
      if (this.firstOffsetY) {
        //获取Y轴偏移量
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        //传入vueX
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      //禁止冒泡
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd(e) {
      //结束后 设置为0
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
    onmaskclick(e) {
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      // this.$store.dispatch('setmenuVisible', !this.menuVisible)
      this.setMenuVisible(!this.menuVisible)
    },
    initFontFamily() {
      let font = getFontFamily(this.fileName)
      //字体不存在
      if (!font) {
        //将默认字体保存到localStorage
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        //字体存在  页面渲染新字体
        this.rendition.themes.font(font)
        //在vuex中更改字体
        this.setDefaultFontFamily(font)
      }
    },
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initTheme() {
      //获取缓存里的值
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        //如果没有则设置为 主题列表第一个
        defaultTheme = this.themeList[0].name

        //保存到缓存
        saveTheme(this.fileName, defaultTheme)
      } //保存到vuex中
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        //遍历并注册
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initRendition() {
      //绑定DOM对象 渲染电子书
      this.rendition = this.book.renderTo('read', {
        //设置渲染为屏幕的宽高
        width: innerWidth,
        height: innerHeight,
        //微信设置
        method: 'default'
      })
      // //显示电子书
      // this.rendition.display().then(() => {
      //   //通过回调函数来获取字体和主题
      //   this.initTheme()
      //   this.initFontFamily()
      //   this.initFontSize()
      //   //全局样式
      //   this.initGlobalStyle()
      //   this.refreshLocation()
      // })
      const localtion = getLocation(this.fileName)
      if (localtion) {
        this.display(localtion, () => {
          this.initTheme()
          this.initFontFamily()
          this.initFontSize()
          //全局样式
          this.initGlobalStyle()
          this.refreshLocation()
        })
      } else {
        this.display(null, () => {
          this.initTheme()
          this.initFontFamily()
          this.initFontSize()
          //全局样式
          this.initGlobalStyle()
          this.refreshLocation()
        })
      }

      //epubjs的钩子函数  渲染前注册样式
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {})
      })
    },
    initGesture() {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    },
    parseBook() {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          // console.log(url)
          //图片 保存到Vuex
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        //基本信息 保存到Vuex
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => {
        //获取目录数据 并扁平化
        const navItem = flatten(nav.toc)

        function find(item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        console.log(navItem)
        this.setNavigation(navItem)
      })
    },

    initEpub() {
      //拼接URL
      const url =
        process.env.VUE_APP_RES_URL +
        /epub/ + this.fileName + '.epub'
      console.log(url)
      //创建电子书实例
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      console.log(this.book)
      this.initRendition()
      // this.initGesture()
      //解析电子书 获取图片
      this.parseBook()
      //book钩子函数
      this.book.ready.then(() => {
        //分页总数==750 *页面宽度/375 *字号/16
        return this.book.locations.generate(750 * (window.innerHeight / 375) * (getFontSize(this.fileName) / 16))
      }).then((locations) => {
        this.refreshLocation()
        this.setBookAvailable(true)
      })
    }
  },
  mounted() {
    // const baseUrl = 'http://192.168.123.169:9000/project/epub/'
    // const fileName = this.$route.params.fileName.split('|').join('/')

    // this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/')).then(() => {
    //   this.initEpub()
    // })
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
    })
    // console.log(`${baseUrl}${fileName}.epub`)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .ebook-reader-mask {
    width: 100%;
    height: 100%;
    // z-index: 150;
    position: absolute;
    background: transparent;
    top: 0;
    left: 0;
  }
}
</style>
