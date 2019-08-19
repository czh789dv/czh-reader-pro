<template>
  <div class="page">
    <div class="searchbar-title-wrapper">
      <div class="title-icon-back-wrapper">
        <span class="iconfont icon-back"></span>
      </div>
      <div class="title-text-wrapper">
        <span class="title-text title">{{$t('home.title')}}</span>
      </div>
      <div class="title-icon-shake-wrapper">
        <span class="iconfont icon-shake"></span>
      </div>
    </div>
    <div class="search-bar-input-wrapper">
      <div class="search-bar-input">
        <span class="iconfont icon-search"></span>
        <input type="text" class="input" :placeholder="$t('home.hint')"></div>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.page {
  width: 100%;
  position: relative;

  .searchbar-title-wrapper {
    position: relative;
    width: 100%;
    height: px2rem(42);
    top: 0;
    left: 0;

    .title-icon-back-wrapper {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      @include center;

      .icon-back {}
    }

    .title-text-wrapper {
      width: 100%;
      height: 100%;
      @include center;

      .title-text {}
    }

    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: 100%;
      @include center;

      .iconfont {}
    }
  }

  .search-bar-input-wrapper {
    width: 100%;
    height: px2rem(52);
    padding: px2rem(10);
    box-sizing: border-box;

    .search-bar-input {
      width: 100%;
      border-radius: px2rem(20);
      background: #f4f4f4;
      border: px2rem(1) solid #eee;
      @include left;
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;
      .iconfont {
        color:#999;
      }

      .input {
        width: 100%;
        height: px2rem(22);
        border: none;
        background: transparent;
        margin-left: px2rem(10);
        font-size: px2rem(12);
        color: #666;
        &:focus{
          outline: none;
        }
        &::-webkit-input-placeholder{
          color: #ccc;
        }
      }
    }
  }
}
</style>
