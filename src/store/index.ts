import { createStore } from "vuex";

export default createStore({
  state: {
    wallet: null,
    network: null,
  },
  mutations: {
    connectWallet(state, wallet) {
      state.wallet = wallet;
    },
    chainChanged(state, network) {
      state.network = network;
    },
  },
  actions: {},
  modules: {},
});
