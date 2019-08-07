<template>
  <div class="ebook-reader">
    <div id="read"></div>
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
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    hideTitleAndMenu() {
      // this.$store.dispatch('setmenuVisible', false)
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
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
      // this.rendition.hooks.content.register(contents => {
      //   //promise回调操作
      //   Promise.all([contents.addStylesheet('http://192.168.123.169:9000/project/fonts/daysOne.css'),
      //     contents.addStylesheet('http://192.168.123.169:9000/project/fonts/cabin.css'),
      //     contents.addStylesheet('http://192.168.123.169:9000/project/fonts/montserrat.css'),
      //     contents.addStylesheet('http://192.168.123.169:9000/project/fonts/tangerine.css')
      //   ]).then(() => {
      //     console.log('字体全部加载完毕....')
      //   })
      // })
      //!!!!使用env文件失败!!!!
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
      this.initGesture()
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
  },
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
</style>
