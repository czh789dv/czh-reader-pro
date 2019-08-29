// 列表页面 所有的查看全部都打开这个组件
// 通过给精选组件传值和循环 来展示
<template>
  <div class="book-list-wrapper">
    <detail-title :title="title" @back="back"></detail-title>
    <scroll :top="42" @onScroll="onScroll">
      <!-- 通过循环list 获取data的数据  -->
      <featured :data="value" :titleText="titleText ? titleText : getCategoryText(key)" :btnText="''" v-for="(value, key, index) in list" :key="index"></featured>
    </scroll>

  </div>
</template>

<script>
import DetailTitle from '../../components/detail/DetailTitle'
import Scroll from '../../components/common/Scroll'
import Featured from '../../components/home/Featured'
import {
  list
} from '../../api/store'
import {
  categoryList,
  categoryText
} from '../../utils/store'
import {
  realPx
} from '../../utils/utils'
export default {
  computed: {
    title() {
      if (this.list) {
        return this.total && this.$t('home.allBook').replace('$1', this.totalNumber)
      } else {
        return null
      }
    },
    totalNumber() {
      let num = 0
      Object.keys(this.list).forEach(key => {
        num += this.list[key].length
      })
      return num
    }
  },
  created() {
    this.getlist()
    this.titleText = this.$route.query.categoryText
  },
  methods: {
    getCategoryText(key) {
      return `${categoryText(categoryList[key], this)}(${this.list[key].length})`
    },
    getlist() {
      list().then(res => {
        this.list = res.data.data
        this.total = res.data.total
        const category = this.$route.query.category
        const keyword = this.$route.query.keyword
        // 获取路由中的学科名称 并过滤数据进行展示
        if (category) {
          const key = Object.keys(this.list).filter(item => item === category)[0]
          const data = this.list[key]
          this.list = {}
          this.list[key] = data
          // 使用搜索的时候进行展示
        } else if (keyword) {
          Object.keys(this.list).filter(key => {
            this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0)
            return this.list[key].length > 0
          })
        }
      })
    },
    back() {
      this.$router.go(-1)
    },
    onScroll(offsetY) {
      if (offsetY > realPx(42)) {
        this.$refs.title.showShadow()
      } else {
        this.$refs.title.hideShadow()
      }
    }
  },
  components: {
    DetailTitle,
    Scroll,
    Featured
  },
  data() {
    return {
      list: null,
      total: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.book-list-wrapper {
  height: 100%;
  width: 100%;
  background: white;
}
</style>
