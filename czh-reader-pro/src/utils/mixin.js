import {
  mapGetters,
  mapActions
} from 'vuex'

export const ebookMixin = {
  computed: {
    ...mapGetters(['fileName', 'menuVisible', 'settingVisible', 'defaultFontSize'])
  },
  methods: {
    ...mapActions(['setmenuVisible', 'setFileName', 'setSettingVisible', 'setDefaultFontSize'])
  }
}
