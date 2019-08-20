import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  themeList,
  addCss,
  removeAllCss,
  getReadTimeByMinute
} from './book'
import {
  saveLocation,
  getBookmark
} from './localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters(['fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themeList() {
      return themeList(this)
    },
    getSectionName() {
      // if (this.section) {
      //   const sectionInfo = this.process.section(this.section)
      //   if (sectionInfo && sectionInfo.href && this.currentBook && this.currentBook.navigation) {
      //     return this.currentBook.navigation.get(sectionInfo.href).label
      //   }
      // }
      // return null
      return this.section ? this.navigation[this.section].label : ''
    }
  },
  methods: {
    ...mapActions(['setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Glod':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_glod.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
      }
    },
    refreshLocation() {
      //获取地址信息
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        //获取页面第一个字的cfi位置信息
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        //设置进度
        this.setProgress(Math.floor(progress * 100))
        //保存到vuex
        this.setSection(currentLocation.start.index)
        //本地保存
        saveLocation(this.fileName, startCfi)
        //判断书签
        const bookmark = getBookmark(this.fileName)
        // console.log(bookmark)
        if (bookmark) {
          //ES6 some方法 检索是否包含 返回bool
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
        } else {
          this.setIsBookmark(false)
        }
      }
    },
    display(target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        return this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    hideTitleAndMenu() {
      // this.$store.dispatch('setmenuVisible', false)
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    }
  }
}

export const homeMixin = {
  computed: {
    ...mapGetters(['offsetY',
      'hotSearchOffsetY'
    ])
  },
  methods: {
    ...mapActions(['setOffsetY', 'setHotSearchOffsetY'])
  }
}
