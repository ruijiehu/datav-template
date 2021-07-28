const homepage = {
  namespaced: true,
  state: {
    activeCode: []
  },
  mutations: {
    setCode (state, value) {
      state.activeCode = value
    }
  }
}

export { homepage }
