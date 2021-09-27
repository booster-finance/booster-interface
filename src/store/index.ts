import { createStore } from "vuex";

export default createStore({
  state: {
    wallet: null,
    network: null,
    address: null,
  },
  mutations: {
    connectWallet(state, wallet) {
      state.wallet = wallet;
    },
    setNetwork(state, network) {
      state.network = network;
    },
    setAddress(state, address){
      state.address = address;
    }
  },
  actions: {},
  modules: {},
});
