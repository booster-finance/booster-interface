import { createStore } from "vuex";

export default createStore({
  state: {
    wallet: null,
    network: null,
    account: null,
    factoryContractAddress: "0xC9BBD0333E3463132823639CdEFD735f18256624",
    ustContractAddress: "0xe548bf086b4baa6c8a5ca63ac55c79f5b9af25f7" 
  },
  mutations: {
    connectWallet(state, wallet) {
      state.wallet = wallet;
    },
    setNetwork(state, network) {
      state.network = network;
    },
    setAccount(state, account){
      state.account = account;
    }
  },
  actions: {},
  modules: {}
});