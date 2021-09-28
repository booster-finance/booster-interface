import { createStore } from "vuex";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default createStore({
  state: {
    wallet: null,
    account: null,
    network: null
  },
  mutations: {
    connectWallet(state, wallet) {
      state.wallet = wallet;
    },
    setAccount(state, account) {
      state.account = account;
    },
    setNetwork(state, network){
      state.network = network
    }
  },
  actions: {},
  modules: {},
});
