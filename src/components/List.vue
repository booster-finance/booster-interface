<template>
  <div class="list">
    <slot name="header" />
    <InfoBox class="empty" v-if="items.length == 0">Empty List</InfoBox>
    <div class="list" v-else>
      <p>
        The list has <b>{{ items.length }}</b> items:
      </p>
      <slot name="items" />
    </div>
    <button v-if="max == null || items.length < max" @click="$emit('add')">
      <font-awesome-icon class="icon" :icon="['fas', 'plus']" />
      <span>Add Item</span>
      
    </button>
    <InfoBox v-else>Reached maximum tier list.</InfoBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoBox from "./InfoBox.vue";

export default defineComponent({
  name: "List",
  components: { InfoBox },
  props: {
    max: {
      type: Number,
      default: null,
    },
    items: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.empty {
  margin-bottom: 5px;
}

.icon {
  margin-right: 10px;
  color: $gray-70;
}

span {
  font-weight: bold;
}
</style>
