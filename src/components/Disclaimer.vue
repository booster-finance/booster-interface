<template>
  <div class="background">
    <div class="message">
      <h2>Disclaimer</h2>
      <p>
        This project was created for the TradiFi Defi Hackathon on the Harmony
        Project and is in a beta stage! <b>We advice to use this on testnet only!</b>
        As the contracts have not yet fully battle tested yet.
      </p>
      <p>Anybody can create a project, so use at your own risk!</p>
      <div class="understood button" @click="() => this.$emit('accept')">
        Understood
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Error",
});
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  z-index: 1000000000000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: $primary, $alpha: 0.8);
}

.message {
  > *:first-child {
    margin-top: 0;
  }
  width: 720px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  background: $background;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.understood {
  margin-top: 50px;
  max-width: 100px;
  margin-left: auto;
}
</style>
