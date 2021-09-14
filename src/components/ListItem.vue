<template>
  <div class="list-item">
    <header @click="() => (this.collapsed = !this.collapsed)">
      <slot />
      <button id="remove-btn" @click.stop="() => $emit('remove')">
        Remove
      </button>
    </header>
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

header {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: $border;
  cursor: pointer;
  user-select: none;
}

#remove-btn {
  margin-right: 5px;
  flex: 0;
}

.body {
  padding: 5px;
}

.list-item {
  // padding: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  margin-bottom: 5px;

  h4 {
    margin: 0;
  }

  ul {
    padding-inline-start: 25px;
  }
}
</style>