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
            <div class="book-detail-content-text">{{publisher}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.category')}}</div>
            <div class="book-detail-content-text">{{categoryText}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.ISBN')}}</div>
            <div class="book-detail-content-text">{{isbn}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">{{$t('detail.lang')}}</div>
            <div class="book-detail-content-text">{{lang}}</div>
          </div>
        </div>
      </div>
      <!-- 输出所有章节目录 -->
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.navigation')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper" v-if="!this.navigation">
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
          <div class="book-detail-content-item-wrapper">
            <div class="book-detail-content-item" v-for="(item, index) in flatNavigation" :key="index" @click="read(item)">
              <div class="book-detail-content-navigation-text" :class="{'is-sub': item.deep> 1}" :style="itemStyle(item)" v-if="item.label">{{item.label}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 试读部分 -->
      <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.trial')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper" v-if="!this.displayed">
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
        </div>
        <div id="preview" v-show="this.displayed" ref="preview"></div>
      </div>
    </scroll>
    <!-- 最下面一行按钮 绝对定位 -->
    <div class="buttom-wrapper">
      <div class="bottom-btn" @click.stop.prevent="readBook()">{{$t('detail.read')}}</div>
      <div class="bottom-btn">{{$t('detail.listen')}}</div>
      <div class="bottom-btn">{{$t('detail.addOrRemoveShelf')}}</div>
    </div>
    <toast :text="toastText" ref="toast"></toast>
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
import {
  realPx,
  px2rem
} from '../../utils/utils'
global.ePub = Epub

export default {
  //通过计算属性 在需要的时候 获取电子书的相关信息
  computed: {
    desc() {
      if (this.description) {
        return this.description.substring(0, 100)
      } else {
        return ''
      }
    },
    lang() {
      return this.metadata ? this.metadata.language : '无'
    },
    isbn() {
      return this.metadata ? this.metadata.identifier : '无'
    },
    publisher() {
      return this.metadata ? this.metadata.publisher : '无'
    },
    title() {
      return this.metadata ? this.metadata.title : ''
    },
    author() {
      return this.metadata ? this.metadata.creator : '无'
    },
    // 数据一维化
    flatNavigation() {
      if (this.navigation) {
        return Array.prototype.concat.apply([], Array.prototype.concat.apply([], this.doFlatNavigation(this.navigation.toc)))
      } else {
        return []
      }
    }
  },
  methods: {
    readBook() {
      this.$router.push({
        path: `/ebook/${this.categoryText}|${this.fileName}`
      })
    },

    read(item) {
      this.$router.push({
        path: `/ebook/${this.categoryText}|${this.fileName}`
      })
    },
    // 目录根据章节缩进
    itemStyle(item) {
      return {
        magrinLeft: (item.deep - 1) * px2rem(20) + 'rem'
      }
    },
    //递归 将所有数据取出来 重组
    doFlatNavigation(content, deep = 1) {
      const arr = []
      content.forEach(item => {
        item.deep = deep
        arr.push(item)
        if (item.subitems && item.subitems.length > 0) {
          arr.push(this.doFlatNavigation(item.subitems, deep + 1))
        }
      })
      return arr
    },
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
            console.log(this.bookItem)
            this.cover = this.bookItem.cover
            // 获取opf
            let rootFile = data.rootFile
            if (rootFile.startsWith('/')) {
              rootFile = rootFile.substring(1, rootFile.length)
            }
            this.opf = `${process.env.VUE_APP_EPUB_OPF_URL}/${this.fileName}/${rootFile}`
            this.parseBook(this.opf)
          } else {
            this.showToast(res.data.msg)
          }
        })
      }
    },
    //渲染电子书
    display(location) {
      if (this.$refs.preview) {
        if (!this.rendition) {
          this.rendition = this.book.renderTo('preview', {
            width: window.innerWidth > 640 ? 640 : window.innerWidth,
            height: window.innerHeight,
            method: 'default'
          })
        }
        if (!location) {
          return this.rendition.display()
        } else {
          return this.rendition.display(location)
        }
      }
    },
    //获取电子书
    downloadBook() {
      const opf = `${process.env.VUE_APP_EPBU_URL}/${this.bookItem.categoryText}/${this.bookItem.fileName}/OEBPS/package.opf`
      this.parseBook(opf)
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
              this.displayed = true
              // 通关正则获取描述信息
              const reg = new RegExp('<.+?>', 'g')
              const text = section.output.replace(reg, '').replace(/\s\s/g, '')
              this.description = text
            })
          }
        }
      })
    },
    //返回键
    back() {
      this.$router.go(-1)
    },
    //获取滚动条Y轴偏移量 显示隐藏阴影
    onScroll(offsetY) {
      if (offsetY > realPx(42)) {
        this.$refs.title.showShadow()
      } else {
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
      trialRead: null,
      cover: null,
      navigation: null,
      displayed: false,
      audio: null,
      randomLocation: null,
      description: null,
      toastText: '',
      trialText: null,
      categoryText: null,
      opf: null
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.book-detail {
  width: 100%;
  background: white;

  .content-wrapper {
    width: 100%;

    .book-detail-content-wrapper {
      width: 100%;
      border-bottom: px2rem(1) solid #eee;
      box-sizing: border-box;

      .preview {}

      .book-detail-content-title {
        padding:  px2rem(20) px2rem(15) px2rem(10) px2rem(15);
        font-size: px2rem(20);
        font-weight: bold;
      }

      .book-detail-content-list-wrapper {
        padding: px2rem(10) px2rem(15) ;

        .book-detail-content-row {
          display: flex;
          box-sizing: border-box;
          margin-bottom: px2rem(10);

          .book-detail-content-label {
            flex: 0 0 px2rem(70);
            font-size: px2rem(14);
            color: #666;
          }

          .book-detail-content-text {
            font-size: px2rem(14);
            flex: 1;
            color: #333;
          }
        }

        .loading-text-wrapper {
          width: 100%;

          .loading-text {
            color: #666;
            font-size: px2rem(14);
          }
        }

        .book-detail-content-item-wrapper {
          .book-detail-content-item {
            padding: px2rem(15) 0;
            font-size: px2rem(14);
            border-bottom: px2rem(1) solid #eee;
            &:last-child{
              border-bottom: none;
            }

            .book-detail-content-navigation-text {
              width: 100%;
              @include ellipse;
            }
          }
        }
      }
    }
  }

  .buttom-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    width: 100%;
    height: px2rem(52);
    box-shadow: 0 px2rem(-2) px2rem(2) rgba(0, 0, 0, .15);
    background: rgb(255, 255, 255);

    .bottom-btn {
      flex: 1;
      color: $color-blue;
      font-size: px2rem(14);
      @include center;

      &:active {
        color: $color-blue-transparent;
      }

      .icon-check {
        margin-right: px2rem(5);
      }
    }

    &.hide-shadow {
      box-shadow: none;
    }
  }
}
</style>
