<template>
  <header>
    <div class="brand">
      <img src="booster.svg" alt="Image of Booster Finance" />
      <span>Booster Finance</span>
    </div>

    <Navigation />
    <Wallet />
  </header>
</template>

<script lang="ts">
import Wallet from "./Wallet.vue";
import Navigation from "./Navigation.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Header",
  components: { Wallet, Navigation },
});
</script>

<style lang="scss" scoped>
img {
  display: block;
  height: 36px;
  margin-right: 20px;
}
header {
  display: flex;
  padding: 10px;
  position: relative;
  align-items: center;
}

.brand {
  display: flex;
  height: 100%;
  align-items: center;
  text-transform: uppercase;
  margin-right: auto;
}
</style>
