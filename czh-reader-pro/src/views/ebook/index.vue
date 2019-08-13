<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
import {
  saveReadTime,
  getReadTime
} from '../../utils/localStorage'
import {
  ebookMixin
} from '../../utils/mixin'
export default {
  watch: {
    offsetY(v) {
      if (v > 0) {
        this.move(v)
      } else if (v === 0) {
        this.restore()
      }
    }
  },
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  methods: {
    restore() {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = ' all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    },
    move(v) {
      this.$refs.ebook.style.top = v + 'px'
    },
    //设置定时器
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      //初始化时间
      if (!readTime) {
        readTime = 0
      }
      //定时器  1000毫秒 ++一次  每60秒保存一次
      this.task = setInterval(() => {
        readTime++
        if (readTime % 60 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    //销毁之前清空
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
.ebook {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
