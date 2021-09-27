<template>
  <div class="modal" @click="close">
    <div class="modal-content" @click.prevent.stop>
      <header><slot name="header" />Connect to Wallet</header>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  methods: {
    close: function () {
      this.$emit("close");
    },
  },
})
export default class Modal extends Vue {}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.7);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  min-width: 420px;
  width: 100%;
  max-width: 720px;
  max-height: 100%;
  border-radius: 5px;
  overflow: hidden;
}

.body {
  padding: 20px;
}
header {
  padding: 10px 20px;
  border-bottom: 1px solid black;
  background-color: whitesmoke;
}
</style>