<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
export default {
  components: {
    EbookReader,
    EbookTitle
  }

}
</script>

<style lang="scss" scoped>

</style>
