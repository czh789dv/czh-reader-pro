<template>
  <div class="store-home">
    <searchbar></searchbar>

  </div>
</template>

<script>
import searchbar from '../../components/home/SearchBar'
export default {
  components: {
    searchbar
  },
  data() {
    return {

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
