<template>
  <transition name='hot-search-move'>
    <scroll class="hot-serach-wrapper" :top="52" @onScroll="onScroll" ref="scroll">
      <hot-search :label="$t('home.hotSearch')" :btn="$t('home.change')" :hotSearch="searchList.hotSearch"></hot-search>
      <div class="line"></div>
      <hot-search :label="$t('home.historySearch')" :btn="$t('home.clear')" :hotSearch="searchList.hotSearch"></hot-search>
    </scroll>
  </transition>
</template>

<script>
import HotSearch from './HotSearch'
import Scroll from '../common/Scroll'
import {
  homeMixin
} from '../../utils/mixin'
import {
  HOT_SEARCH,
  HISTORY_SEARCH
} from '../../utils/store'
export default {
  mixins: [homeMixin],
  components: {
    HotSearch,
    Scroll
  },
  data() {
    return {
      searchList: {
        hotSearch: HOT_SEARCH,
        historySearch: HISTORY_SEARCH
      }
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setHotSearchOffsetY(offsetY)
    },
    reset() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.hot-serach-wrapper {
  width: 100%;
  height: 100%;
  background: white;

  .line {
    width: 100%;
    height: 0;
    border-top: px2rem(1) solid #eeeeee;
    margin: px2rem(10) 0;
  }
}
</style>
