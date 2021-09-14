import { createStore } from "vuex";

export default createStore({
  state: {
    walletModalActive: false,
  },
  mutations: {
    closeWalletModal: function (state) {
      state.walletModalActive = false;
    },
    openWalletModal: function (state) {
      // TODO: Close all other modals.
      state.walletModalActive = true;
    },
  },
  actions: {},
  modules: {},
});
