<template>
  <div id="app">
    <div id="nav">
      <span id='sss'>sadasdasd</span>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
const getters = {
  a: () => 1,
  b: () => 2
}

function fn(keys) {
  const data = {}
  keys.forEach(key => {
    if (getters.hasOwnProperty(key)) {
      data[key] = getters[key]
    }
  })
  return data
}
export default {
  computed: {
    ...mapGetters(['test']),
    ...fn(['a', 'b', 'c'])
  },
  mounted() {
    this.$store.dispatch('setTest', 9).then(() => {
      console.log(this.$store.state.book.test, this.test, this.a, this.b)
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss" scoped>
@import "./assets/styles/global.scss";

#sss {
  color: orange;
  font-size: px2rem(20);
  font-family: daysOne;

}
</style>
