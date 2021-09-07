<template>
  <div class="wallet" @click="plus">
    <Button>Connect</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

// import Button from "./CustomButton.vue";
export default defineComponent({
  name: "Wallet",
});
</script>
