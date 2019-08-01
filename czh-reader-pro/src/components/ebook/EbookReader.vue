<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
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
      this.rendition.display()
      console.log(111)
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
