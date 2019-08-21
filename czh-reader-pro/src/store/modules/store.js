const store = {
  state: {
    hotSearchOffsetY: 0,
    //默认不显示推荐卡片
    flapCardVisible: false
  },
  mutations: {
    SET_HOT_SEARCH_OFFSETY(state, offsetY) {
      state.hotSearchOffsetY = offsetY
    },
    SET_FLAP_CARD_VISIBLE(state, visible) {
      state.flapCardVisible = visible
    }
  }
}

export default store
