<template>
  <div class="title">
    <div class="label">{{label}}</div>
    <div class="btn" @click="click">{{btn}}</div>

  </div>
</template>

<script>
export default {
  props: {
    label: String,
    btn: String
  },
  methods: {
    click() {
      this.$emit('click')
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

.title {
  width: 100%;
  padding: px2rem(10);
  box-sizing: border-box;
  @include top;

  .label {
    flex: 1;
    font-size: px2rem(18);
    color: #333;

  }

  .btn {
    font-size: px2rem(14);
    color: rgba(61, 158, 255, 1);

    &:active {
      color: rgba(61, 158, 255, .5);
    }
  }
}
</style>
