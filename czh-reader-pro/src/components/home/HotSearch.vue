<template>
  <div>
    <div class="hot-search-title">
      <span class="label">{{label}}</span>
      <span class="btn">{{btn}}</span>
    </div>
    <div class="hot-search-list">
      <div class="hot-search-item" v-for="(item,index) in hotSearch" :key="index">
        <div class="icon-wrapper">
          <span class="iconfont icon-book" v-if="item.type === 1"></span>
          <span class="iconfont icon-search" v-if="item.type === 2"></span>
        </div>
        <div class="hot-search-text-wrapper">
          <div class="text" ref="searchText">{{item.text}}</div>
          <div class="num" v-if="item.num">{{item.num}}人购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  realPx
} from '../../utils/utils'
export default {
  props: {
    label: String,
    btn: String,
    hotSearch: Array
  },
  mounted() {
    this.$refs.searchText.forEach(item => {
      item.style.width = window.innerWidth - realPx(20) - realPx(40) + 'px'
    })
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

.hot-search-title {
  display: flex;
  width: 100%;
  font-size: px2rem(13);
  padding: px2rem(10);
  box-sizing: border-box;

  .label {
    flex: 1;
    text-align: left;
    font-weight: bold;
    color: #666;
  }

  .btn {
    flex: 1;
    text-align: right;
    font-weight: bold;
    color: #409EFF;
  }
}

.hot-search-list {
  width: 100%;
  padding: 0 px2rem(10);
  box-sizing: border-box;

  .hot-search-item {
    display: flex;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      font-size: px2rem(16);
      @include center;
      .icon-book {}

      .icon-search {}
    }

    .hot-search-text-wrapper {
      flex: 1;
      height: px2rem(35);
      .text {
        // margin-top:px2rem(5);
        flex: 1;
        height: 100%;
        color: #666;
        @include ellipse;
        @include left;
        font-size: px2rem(14);
      }

      .num {
        font-size: px2rem(12);
        margin-top: px2rem(-5);
        color: #999;
      }
    }
  }
}
</style>
