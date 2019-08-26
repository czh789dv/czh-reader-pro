<template>
  <div class="guess-you-like">
    <!-- 预留标题组件 -->
    <title1 :label="$t('home.guessYouLike')" :btn="$t('home.change')" @click="change()"></title1>
    <div class="guess-you-like-list">
      <div class="guess-you-like-item" v-for="(item, index) in showData" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img :src="item.cover" class="img">
        </div>
        <div class="content-wrapper">
          <div class="title">{{item.title}}</div>
          <div class="author">{{item.author}}</div>
          <div class="result">{{resultText(item)}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Title1 from './Title'
import {
  homeMixin
} from '../../utils/mixin'
export default {
  mixins: [homeMixin],
  props: {
    data: Array
  },
  methods: {
    resultText(item) {},
    change() {
      console.log('11')
      // if (this.index + 1 >= this.total) {
      //   this.index = 0
      // } else {
      //   this.index++
      // }
    }

  },
  watch: {
    data(v) {
      this.total = v.length / 3
    }
  },
  computed: {
    //通过计算属性直接生成一个数据列表
    showData() {
      if (this.data) {
        return [
          this.data[this.index],
          this.data[this.index + this.total],
          this.data[this.index + this.total * 2]
        ]
      } else {
        return []
      }
    }
  },
  components: {
    Title1
  },
  data() {
    return {
      index: 0,
      total: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.guess-you-like {
  .guess-you-like-list {
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;

    .guess-you-like-item {
      display: flex;
      margin-top: px2rem(15);

      .img-wrapper {
        flex: 0 0 20%;
        padding: px2rem(10) px2rem(10) px2rem(10) 0;
        box-sizing: border-box;

        .img {
          width: 100%;
        }
      }

      .content-wrapper {
        flex: 1;
        padding: px2rem(10) 0;
        font-size: px2rem(14);

        .title {}

        .author {
          margin-top: px2rem(10);
        }

        .result {
          margin-top: px2rem(10);
        }
      }
    }
  }
}
</style>
