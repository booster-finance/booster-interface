<template>
  <div class="error">
    <font-awesome-icon class="icon" :icon="['fas', 'exclamation-triangle']" />
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Error",
  components: { FontAwesomeIcon },
});
</script>

<style lang="scss" scoped>
.error {
  background-color: $red;
  border: $border;
  padding: 10px 20px;
  color: $white;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 20px;
  }
}
</style>
