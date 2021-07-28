export default {
  namespaced: true,
  state: {
    // 全局地图实例
    mapInstance: null
  },
  mutations: {
    // 设置地图实例，当地图销毁时，清空该实例
    setMapInstance (state, payload) {
      state.mapInstance = payload
    }
  }
}
