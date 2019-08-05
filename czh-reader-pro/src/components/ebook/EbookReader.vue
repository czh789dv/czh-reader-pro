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
  saveFontSize
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
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
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
    initEpub() {
      //拼接URL
      const url = 'http://192.168.123.169:9000/project/epub/' + this.fileName + '.epub'
      console.log(url)
      //创建电子书实例
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      console.log(this.book)
      //绑定DOM对象 渲染电子书
      this.rendition = this.book.renderTo('read', {
        //设置渲染为屏幕的宽高
        width: innerWidth,
        height: innerHeight,
        //微信设置
        method: 'default'
      })
      //显示电子书
      this.rendition.display().then(() => {
        //通过回调函数来获取字体和主题
        this.initFontFamily()
        this.initFontSize()
      })
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
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/project/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/project/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/project/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/project/fonts/tangerine.css`)
        ]).then(() => {})
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
