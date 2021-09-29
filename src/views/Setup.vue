<template>
  <div class="setup" @click="setup">
    <p>
      This page is for an initial setup. Use it to deploy the factory contract
      to the current chain.
    </p>
    <div class="button" @click="setup">Setup</div>
    <div>{{ contractAddress }}</div>

    <div>fakeUST</div>
    <div>0x9e9bebfb40ba860fa15a24ecc082aa4192f84d13</div>
  </div>
</template>

<script lang="ts">
import ProjectFactory from "@/web3/projectFactory";
import { defineComponent } from "vue";
export default defineComponent({
  data: function () {
    return {
      contractAddress: "",
    };
  },
  methods: {
    async setup() {
        try {
          let contract = await ProjectFactory.createContract();
          this.contractAddress = contract.options.address;
        } catch (e) {
          console.log(e);
        }
    },
  },
});
</script>