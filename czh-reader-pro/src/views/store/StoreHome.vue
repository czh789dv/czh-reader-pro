<template>
  <div class="store-home">
    <searchbar></searchbar>
    <flap-card :data="random"></flap-card>
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
import FlapCard from '../../components/home/FlapCard'
import scroll from '../../components/common/Scroll'
import {
  home
} from '../../api/store'
import {
  homeMixin
} from '../../utils/mixin'
export default {
  mounted() {
    //axios获取数据
    home().then(response => {
      if (response && response.status === 200) {
        const data = response.data
        //floor向下取整
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
      }
    })
  },
  mixins: [homeMixin],
  components: {
    searchbar,
    scroll,
    FlapCard
  },
  data() {
    return {
      scorllTop: 94,
      random: null
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
