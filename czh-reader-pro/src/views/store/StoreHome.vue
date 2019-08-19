<template>
  <div class="store-home">
    <searchbar></searchbar>
    <scroll :top="scorllTop" @onScroll="onScroll" ref="scroll">
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
      <div>1111111111111111111111111111111111</div>
    </scroll>

  </div>
</template>

<script>
import searchbar from '../../components/home/SearchBar'
import scroll from '../../components/common/Scroll'
import {
  homeMixin
} from '../../utils/mixin'
export default {
  mixins: [homeMixin],
  components: {
    searchbar,
    scroll
  },
  data() {
    return {
      scorllTop: 94
    }
  },
  methods: {
    //捕捉SCROLL的Y轴偏移量
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scorllTop = 52
      } else {
        this.scorllTop = 94
      }
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.store-home {
  width: 100%;
  height: 100%;
}
</style>
