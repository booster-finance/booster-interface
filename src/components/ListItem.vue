<template>
  <div class="list-item">
    <slot />
    <button class="remove-btn" @click.stop="() => $emit('remove')">Remove</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItem",
  data() {
    return {
      collapsed: true,
    };
  },
});
</script>

<style lang="scss">
.list-item header > * {
  flex: 1;
  margin: 0 20px;
}
</style>

<style lang="scss" scoped>
$border: 1px solid rgb(224, 224, 224);



.remove-btn {
  flex: 0;
}

.body {
  padding: 5px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  // padding: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin-bottom: 5px;


  ul {
    padding-inline-start: 25px;
  }
}
</style>