<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  methods: {
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleTitleAndMenu() {},
    initEpub() {
      //拼接URL
      const url = 'http://192.168.123.169:9000/project/epub/' + this.fileName + '.epub'
      console.log(url)
      //创建电子书实例
      this.book = new Epub(url)
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
    this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/')).then(() => {
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
