<template>
  <header>
    <router-link :to="{ name: 'Home' }" class="brand">
      <img src="booster.svg" alt="Image of Booster Finance" />
      <span>Booster Finance</span>
      <span id="betaTag">[beta]</span>
    </router-link>

    <Wallet />
  </header>
</template>

<script lang="ts">
import Wallet from "./Wallet.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Header",
  components: { Wallet },
});
</script>

<style lang="scss" scoped>
a {
  color: $black;
  text-decoration: none;
}

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
  background-color: $white;
  border-bottom: 1px solid $gray-30;
}

.brand {
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  text-transform: uppercase;
  margin-right: auto;
}

#betaTag {
  text-transform: lowercase;
  font-weight: bold;
  color: $primary;
  font-size: 0.75rem;
  position: absolute;
  top: 5px;
  right: 0;
  transform: translateX(110%);
}
</style>
