<template>
  <div class="ebook-reader">
    <div class="read"></div>
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
    initEpub() {
      //拼接URL
      const url = 'http://192.168.123.169:9000/project/epub/' + this.fileName + '.epub'
      console.log(url)
      //创建电子书实例
      this.book =new Epub(url)
      //绑定DOM对象 渲染电子书
      this.rendition =this.book.renderTo('read', {
        //设置渲染为屏幕的宽高
        width:innerWidth,
        height:innerHeight,
        //微信设置
        method:'default'
      })
      //显示电子书
      this.rendition.display()
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
