<template>
  <!-- 标题栏  左边一个返回按钮  中间可以显示标题  右边书架分享 -->
  <div class="detail-title-wrapper" :class="{'hide-shadow':ifHideShadow}">
    <div class="title-left-wrapper" @click="back">
      <span class="iconfont icon-back"></span>
    </div>
    <div class="title-right-wrapper">
      <span class="iconfont icon-shelf"  v-if="showShelf" @click="showBookShelf"></span>
      <span class="iconfont icon-share"></span>
    </div>
    <div class="title-text">
      {{title}}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    title: String,
    showShelf: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showBookShelf() {
      this.$router.push('/store/shelf')
    },
    back() {
      this.$emit('back')
    },
    showShadow() {
      this.ifHideShadow = false
    },
    hideShadow() {
      this.ifHideShadow = true
    }
  },
  components: {},
  data() {
    return {
      ifHideShadow: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.detail-title-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: px2rem(42);
  font-size: px2rem(18);
  color: #666;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .15);

  &.hide-shadow {
    box-shadow: none;
  }

  .title-left-wrapper {
    position: relative;
    z-index: 150;
    flex: 1;
    margin-left: px2rem(15);
    @include left;

    .icon-back {
      font-size: px2rem(20);
    }
  }

  .title-right-wrapper {
    position: relative;
    z-index: 150;
    flex: 1;
    margin-right: px2rem(15);
    @include right;

    .icon-shelf {
      font-size: px2rem(20);
      margin-right: px2rem(10);
    }

    .icon-share {
      font-size: px2rem(20);
    }
  }

  .title-text {
    @include center;
    position: relative;
    top: 0;
    height: px2rem(42);
    font-size: px2rem(14);
    line-height: px2rem(16);
    margin-right: px2rem(10);
  }
}
</style>
