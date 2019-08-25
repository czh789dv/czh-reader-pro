<template>
  <!-- 把所有类别 都显示出来
每行2个类别  每个类别 有2张里面图书的图片重叠显示
文字显示 类别名称 和 书籍数量  -->
  <div class="category">
    <title1 :label="$t('home.category')" :btn="$t('home.seeAll')"></title1>
    <div class="category-list">
      <div class="category-item-wrapper" v-for="(item,index) in data" :key="index">
        <div class="category-item">
          <div class="content-wrapprt">
            <div class="title">{{categoryText(item.category)}}</div>
            <div class="num">{{item.num + '' + '本书'}}</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="item.img1">
              <img class="img2" :src="item.img2">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  categoryText
} from '../../utils/store'
import title1 from './Title'
export default {
  methods: {
    categoryText(category) {
      return categoryText(category, this)
    }
  },
  props: {
    data: Array
  },
  components: {
    title1
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.category {

  .category-list {
    display: flex;
    flex-flow: row wrap;

    .category-item-wrapper {
      flex: 0 0 50%;
      width: 50%;
      padding: px2rem(5);
      box-sizing: border-box;

      .category-item {
        display: flex;
        width: 100%;
        background: #eee;

        .content-wrapprt {
          flex: 0 0 50%;
          width: 50%;
          font-size: px2rem(14);
          @include columCenter;

          .title {
            text-align: center;
          }

          .num {
            text-align: center;
            margin-top: px2rem(10);
          }
        }

        .img-wrapper {
          flex: 0 0 50%;
          width: 50%;
          padding: px2rem(20) px2rem(10);
          box-sizing: border-box;

          .img-group {
            position: relative;
            width: 100%;
            height: px2rem(60);
            @include left;

            .img {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 100;
              width: px2rem(45);
              height: px2rem(60);
            }

            .img2 {
              position: absolute;
              left: px2rem(30);
              top: px2rem(7.5);
              z-index: 99;
              width: px2rem(30);
              height: px2rem(45);
            }
          }
        }
      }
    }
  }
}
</style>
