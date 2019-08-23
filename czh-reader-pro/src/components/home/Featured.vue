<template>
  <div class="featured">
    <title1 :label="$t('home.featured')" :btn="$t('home.change')"></title1>
    <div class="featured-list">
      <div class="featured-item-wrapper">
        <div class="featured-item">
          <div class="img-warpper">
            <img src="#" alt="" class="img">
          </div>
          <div class="content-wrapper">
            <div class="title"></div>
            <div class="author"></div>
            <div class="category"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Title1 from './Title'
export default {
  props: {
    data: Array
  },
  components: {
    Title1
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.featured {
  width: 100%;
  height: 100%;

  .featured-list {
    .featured-item-wrapper {
      .featured-item {
        .img-warpper {
          .img {}
        }

        .content-wrapper {
          .title {}

          .author {}

          .category {}
        }
      }
    }
  }
}
</style>
