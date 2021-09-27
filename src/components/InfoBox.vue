<template>
  <div class="box">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class InfoBox extends Vue {}
</script>

<style lang="scss" scoped>
.box {
  padding: 10px 20px;
  background-color: whitesmoke;
  border: 1px solid gray;
  color: gray;
  border-radius: 3px;
}
</style>
