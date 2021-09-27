<template>
  <div
    class="pending-item"
    :class="{ completed: isCompleted, pending: isPending }"
  >
    <font-awesome-icon
      v-show="isCompleted"
      class="icon"
      :icon="['fas', 'check']"
    />

    <spinner v-show="this.isPending" id="spinner" />
    <span class="text">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Spinner from "./Spinner.vue";

export default defineComponent({
  name: "PendingItem",
  components: { Spinner },
  props: {
    status: Number,
  },
  computed: {
    isPending: function () {
      return this.status == 1;
    },
    isCompleted: function () {
      return this.status == 2;
    },
  },
});
</script>

<style lang="scss">
.pending-item .spinner,
.pending-item .icon {
  position: absolute;
  left: 10px;
}
</style>

<style lang="scss" scoped>
.pending-item {
  position: relative;
  border: $border;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  opacity: 0.5;

  display: flex;
  align-items: center;
  transition: all 0.5s;
}

.pending {
  opacity: 1;
  border-color: $primary;
}

.completed {
  opacity: 1;
  background-color: $primary;
  color: $white;
}

.text {
  margin-left: 30px;
}
</style>