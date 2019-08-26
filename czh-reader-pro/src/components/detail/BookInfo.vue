<template>
  <div class="cover-title-wrapper">
    <div class="cover-title-left-wrapper">
      <img :src="cover" class="cover-img">
    </div>
    <div class="cover-title-right-wrapper">
      <div class="detail-cover-title-wrapper">
        <div class="cover-title-text">{{title}}</div>
      </div>
      <div class="cover-author-wrapper">
        <div class="cover-author-text">{{author}}</div>
      </div>
      <div class="detail-cover-description-wrapper">
        <div class="detail-cover-description-text">{{desc}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    cover: String,
    title: String,
    author: String,
    desc: String
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.cover-title-wrapper {
  display: flex;
  width: 100%;
  padding: px2rem(5);
  border-bottom: px2rem(1) solid #eee;
  box-sizing: border-box;
  .cover-title-left-wrapper {
    flex: 0 0 px2rem(100);
    @include top;
    .cover-img {
      width: px2rem(100);
      height: px2rem(140);
    }
  }

  .cover-title-right-wrapper {
    flex: 1;
    padding: px2rem(10);
    box-sizing: border-box;
    .detail-cover-title-wrapper {
      .cover-title-text {
        font-size: px2rem(20);
      }
    }
  }

  .cover-author-wrapper {
    margin-top: px2rem(10);
    .cover-author-text {
      font-size: px2rem(14);
    }
  }

  .detail-cover-description-wrapper {
    margin-top: px2rem(10);
    .detail-cover-description-text {
      font-size: px2rem(12);
      @include ellipsis1(3);
    }
  }
}
</style>
