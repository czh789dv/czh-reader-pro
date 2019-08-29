<template>
  <div class="recommend">
    <title1 :label="($t('home.recommend'))" :btn="($t('home.seeAll'))"></title1>
    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in data" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <!-- <div class="img" :style="{backgroundImage:`url('${Btu}')`}"></div> -->
          <img :src="item.cover" alt="" class="img">
        </div>
        <div class="content-wrapper">
          <div class="title">{{item.title}}</div>
          <div class="num">{{$t('home.readers').replace('$1',item.readers)}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  homeMixin
} from '../../utils/mixin'
import title1 from './Title'
export default {
  mixins: [homeMixin],
  components: {
    title1
  },
  props: {
    data: Array
  },
  data() {
    return {
      Btu: 'https://i0.hdslb.com/bfs/archive/dd0eb89cc79030ba2fbab2ba722562a416611913.jpg@880w_440h.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.recommend {
  width: 100%;
  height: 50%;

  .recommend-list {
    width: 100%;
    @include top;
    padding: px2rem(5);
    box-sizing: border-box;

    .recommend-item {
      flex: 0 0 33%;
      width: 33%;
      padding: px2rem(5);
      box-sizing: border-box;

      .img-wrapper {
        @include center;
        width: 100%;

        .img {
          width: 100%;
          height: px2rem(160);
          background-repeat: no-repeat;
          background-size: 280px 160px;
          background-position-x: 92%;
        }
      }

      .content-wrapper {
        width: 100%;
        margin-top: px2rem(10);
        @include columCenter;

        .title {
          text-align: center;
          @include ellipsis1(3);
        }

        .num {
          font-size: px2rem(12);
          margin-top: px2rem(10);
        }
      }
    }
  }
}
</style>
