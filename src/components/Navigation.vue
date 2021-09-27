<template>
  <div class="navigation">
    <nav>
      <router-link to="/" class="nav-item">Projects</router-link>
      <router-link :to="{ name: 'Create' }" class="nav-item">
        Create
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Navigation",
});
</script>

<style lang="scss" scoped>
$slimborder: 1px solid rgba(0, 0, 0, 0.3);

nav {
  min-width: 320px;

  a {
    display: inline-block;
    padding: 5px 20px;
    margin: 5px 10px;
    font-weight: bold;
    text-decoration: none;
    color: $black;
    border: none;
  }
}

.gain {
  color: greenyellow;
}
</style>
