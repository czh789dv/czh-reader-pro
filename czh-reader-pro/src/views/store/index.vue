<template>
  <div class="store">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "../../assets/styles/global";
.store{
  background: white;
  width: 100%;
  height: 100%;
}
</style>
