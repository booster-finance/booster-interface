<template>
  <header>
    <div class="brand">
      <img src="booster.svg" alt="Image of Booster Finance" />
      <span>Booster Finance</span>
    </div>
    <Wallet />
  </header>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Wallet from "./Wallet.vue";

@Options({ components: { Wallet } })
export default class Header extends Vue {}
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
