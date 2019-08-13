<template>
  <div class="bookmark" :style="style">

  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    color: String
  },
  computed: {
    style() {
      if (this.color) {
        return {
          borderColor: `${this.color} ${this.color} transparent ${this.color};`
        }
      } else {
        return {}
      }
    }
  },
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.bookmark {
  width: 0;
  height: 0;
  border-width: px2rem(40) px2rem(10) px2rem(10) px2rem(10);
  border-style: solid;
  border-color: wheat wheat transparent wheat;
}
</style>
