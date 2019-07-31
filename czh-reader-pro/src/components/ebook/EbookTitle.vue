<template>

  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back iconfont" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf iconfont"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart iconfont"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more iconfont"></span>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['menuVisible'])
  },
  components: {},
  data() {
    return {

    }
  },
  methods: {
    back() {
      console.log('back')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(48);
  background: white;
  display: flex;
  box-shadow: 0 px2rem(5) px2rem(5) rgba(0, 0, 0, 0.15);
  font-size: px2rem(20);

  .left {
    flex: 0 0 px2rem(50);
    @include center;
  }

  .right {
    display: flex;
    flex: 1;
    justify-content: flex-end;

    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;

      .icon-cart {
        font-size: px2rem(22);
      }

      .icon-shelf {
        font-size: px2rem(22);
      }

    }
  }

}
</style>
