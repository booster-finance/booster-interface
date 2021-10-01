<template>
  <div class="wallet">
    <span @click="getBalance">{{ balance / 10 ** 18 }} fUST</span>
    <div class="button" v-if="network?.testnet" @click="faucet">Peggy Tokens</div>
    <div class="button-wrapper" v-if="address && network">
      <div class="copy-text">Copied To Clipboard</div>
      <input
        v-if="address"
        type="text"
        class="button"
        @click="copy"
        :value="this.shortAddress"
      />
    </div>

    <!-- <div class="button" v-if="this.address">Signout</div> -->
    <div
      v-if="!address"
      class="metamask button"
      :class="{ disabled: !metaMaskInstalled }"
      @click="this.connectWallet"
    >
      <img
        width="32"
        :src="require('../assets/wallets/metamask-fox.svg')"
        alt=""
      />
      <span v-if="metaMaskInstalled">Connect</span>
    </div>

    <div v-if="network" class="button disabled">
      {{ this.network.name }}
    </div>
  </div>

  <div class="button disabled" v-if="!metaMaskInstalled">Install MetaMask</div>
  <div
    class="error button"
    @click="requestDefaultChain"
    v-if="address && metaMaskInstalled && !network"
  >
    <font-awesome-icon class="icon" :icon="['fas', 'exclamation-triangle']" />
    Wrong network!
  </div>
</template>

<script lang="ts">
import getNetwork, { defaultChain } from "@/model/Networks";
import { ensureWeb3 } from "@/web3/utils";
import { BigNumber } from "@ethersproject/bignumber";
import { defineComponent } from "@vue/runtime-core";
import { AbiItem } from "web3-utils";

import * as faucetTokenAbi from "../../contracts/faucetTokenAbi.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

// import Button from "./CustomButton.vue";
export default defineComponent({
  name: "Wallet",
  data: function () {
    return {
      balance: 0,
    };
  },
  computed: {
    network: function () {
      return this.$store.state.network;
    },
    address: function () {
      return this.$store.state.account;
    },
    metaMaskInstalled: function () {
      return typeof window.ethereum !== "undefined";
    },
    shortAddress: function () {
      let add = this.address;
      return add.substring(0, 6) + "..." + add.substring(add.length - 4);
    },
  },
  mounted: async function () {
    if (this.metaMaskInstalled) {
      let provider = window.ethereum;

      this.connectWallet();
      provider.on("connect", () => {
        this.connectWallet();
      });

      window.ethereum.on("chainChanged", () => {
        this.updateNetwork();
      });

      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length > 0)
        this.$store.commit("setAccount", accounts[0]);

      window.ethereum.on("accountsChanged", (accounts) => {
        this.$store.commit("setAccount", accounts[0]);
        window.location.reload();
      });
    }
  },
  methods: {
    getBalance: async function () {
      const web3 = await ensureWeb3();

      const contract = await new web3.eth.Contract(
        faucetTokenAbi.abi as AbiItem[],
        this.$store.state.network.ustContractAddress
      );
      this.balance = await contract.methods
        .balanceOf(this.$store.state.account)
        .call();
    },
    faucet: async function () {
      const web3 = await ensureWeb3();

      const contract = await new web3.eth.Contract(
        faucetTokenAbi.abi as AbiItem[],
        this.$store.state.network.ustContractAddress
      );
      
      await contract.methods
        .faucet(
          this.$store.state.account,
          BigNumber.from(String(10000)).mul(String(Math.pow(10, 18)))
        )
        .send({ from: this.$store.state.account });
      await this.getBalance();
    },
    copy: function (evt) {
      evt.target.select();
      document.execCommand("Copy");
      window.getSelection().removeAllRanges();

      evt.target.parentNode.classList.add("copied");
      setTimeout(() => evt.target.parentNode.classList.remove("copied"), 1000);
    },
    requestDefaultChain: async function () {
      let chainId = "0x" + defaultChain.chainId.toString(16); // chainId must be in hexadecimal numbers

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    },
    connectWallet: async function () {
      if (this.metaMaskInstalled) {
        console.log("Connect wallet ...");

        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        this.$store.commit("setAccount", accounts[0]);
        this.updateNetwork();
      }
    },
    updateNetwork() {
      const network = getNetwork(parseInt(window.ethereum.chainId, 16));
      this.$store.commit("setNetwork", network);
    },
  },
});
</script>

<style lang="scss" scoped>
.error {
  background-color: $red;
  margin: 10px;

  &:hover {
    background-color: rgb(199, 118, 118);
  }

  &:active {
    background-color: rgb(158, 81, 81);
  }
}

.copy-text {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  top: 0;
  background-color: rgba($white, 0.836);
  font-size: 0.75em;
  font-weight: bold;
  text-transform: uppercase;
  color: $black;
  position: absolute;
  border-radius: 10px;
}

.button-wrapper {
  position: relative;

  > input {
    height: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }
}

.copied {
  overflow: hidden;
  > .copy-text {
    opacity: 1;
  }
}

.wallet {
  display: flex;
  justify-content: center;

  > *:not(:last-child) {
    margin-right: 10px;
  }
}

.metamask.button {
  padding: 3px;
}

span {
  padding: 5px 15px;
}
</style>
