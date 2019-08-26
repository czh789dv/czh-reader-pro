//书本详细内容
<template>
  <div class="book-detail">
    <detail-title @back="back" :showShelf="true" ref="title"></detail-title>
    <!-- 标题栏组件 -->
    <scroll class="content-wrapper" :top="42" :bottom="52" @onScroll="onScroll" ref="scroll">
      <!-- 滚动条组件 -->
      <book-info :cover="cover" :title="title" :author="author" :desc="desc"></book-info>
      <!-- 图书信息组件 -->
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.copyright')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.publisher')}}</div>
            <div class="book-detail-content-text">{{}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.category')}}</div>
            <div class="book-detail-content-text">{{}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.ISBN')}}</div>
            <div class="book-detail-content-text">{{}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.lang')}}</div>
            <div class="book-detail-content-text">{{}}</div>
          </div>
        </div>
      </div>
      <!-- 输出所有章节目录 -->
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.navigation')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper"></div>
          <div class="book-detail-content-item-wrapper">
            <!-- 循环遍历目录 -->
            <div class="book-detail-content-item">
              <div class="book-detail-content-navigation-text"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 试读部分 -->
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.trial')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper">
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
        </div>
        <div class="preview"></div>
      </div>
    </scroll>
    <!-- 最下面一行按钮 绝对定位 -->
    <div class="buttom-wrapper">
      <div class="bottom-btn">{{$t('detail.read')}}</div>
      <div class="bottom-btn">{{$t('detail.listen')}}</div>
      <div class="bottom-btn">{{$t('detail.addOrRemoveShelf')}}</div>
    </div>
    <toast :text="toasttext" ref="toast"></toast>
  </div>
</template>

<script>
import Epub from 'epubjs'
import BookInfo from '../../components/detail/BookInfo'
import DetailTitle from '../../components/detail/DetailTitle'
import Scroll from '../../components/common/Scroll'
import Toast from '../../components/common/Toast'
import {
  detail
} from '../../api/store'
import { realPx } from '../../utils/utils';
global.ePub = Epub

export default {
  //通过计算属性 在需要的时候 获取电子书的相关信息
  computed: {
    desc() {},
    lang() {},
    isbn() {},
    publisher() {},
    title() {},
    author() {

    },

  },
  methods: {
    init() {
      // 通过路由获取名字和类别
      this.fileName = this.$route.query.fileName
      this.categoryText = this.$route.query.category
      //访问详情页 获取数据
      if (this.fileName) {
        detail({
          fileName: this.fileName
        }).then(res => {
          if (res.status === 200 && res.data.error_code === 0) {
            const data = res.data.data
            this.bookItem = data
            this.cover = this.bookItem.cover
            // 获取opf
            let rootFile = data.rootFile
            if (rootFile.startWith('/')) {
              rootFile = rootFile.substring(1, rootFile.length)
            }
            this.opf = `${pocess.env.VUE_APP_EPUB_OPF_URL}/${this.fileName}/${rootFile}`
            this.parseBook(this.opf)
          } else {
            this.showToast(res.data.msg)
          }
        })
      }
    },
    //渲染电子书
    display() {},
    //获取电子书
    downloadBook() {

    },
    //解析电子书
    parseBook(url) {
      this.book = new Epub(url)
      //通过电子书的钩子函数 获取电子书的相关信息
      this.book.loaded.metadata.then(metadata => {
        this.metadata = metadata
      })
      this.book.loaded.navigation.then(navigation => {
        this.navigation = navigation
        // 内容存在 则显示
        if (this.navigation.toc && this.navigation.toc.length > 1) {
          const candisplay = this.display(this.navigation.toc[1].href)
          if (candisplay) {
            // 异步刷新滚动条
            candisplay.then(section => {
              if (this.$refs.scroll) {
                this.$refs.scroll.refresh()
              }
            })
          }
        }
      })

    },
    //获取滚动条Y轴偏移量 显示隐藏阴影
    onScroll(offsetY){
      if(offsetY > realPx(42)){
        this.$refs.title.showShadow()
      }else{
        this.$refs.title.hideShadow()
      }
    }
  },
  components: {
    BookInfo,
    Scroll,
    DetailTitle,
    Toast
  },
  data() {
    return {
      bookItem: null,
      book: null,
      metadata: null,
      navigation: null,
      categoryText: null

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
</style>
