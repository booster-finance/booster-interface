<template>
  <div class="home">
    <div class="button-group">
      <router-link
        class="button tab-button"
        :class="{ active: isActive('/funding') }"
        :to="{ name: 'ProjectFunding' }"
        >Funding</router-link
      >
      <router-link
        class="button tab-button"
        :class="{ active: isActive('/active') }"
        :to="{ name: 'ProjectActive' }"
        >Active</router-link
      >
      <router-link
        class="button tab-button"
        :class="{ active: isActive('/completed') }"
        :to="{ name: 'ProjectCompleted' }"
        >Completed</router-link
      >
      <router-link
        class="button tab-button"
        :class="{ active: isActive('/cancelled') }"
        :to="{ name: 'ProjectCancelled' }"
        >Cancelled</router-link
      >
    </div>
    <router-view />

    <router-link class="button" id="createProject" :to="{ name: 'Create' }">
      <font-awesome-icon class="icon" :icon="['fas', 'plus']" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  },
});
</script>


<style lang="scss" scoped>
.home {
  width: 720px;
  max-width: 100%;
}

.tab-button {
  color: $primary;
  background-color: transparent;

  &.active {
    background-color: $primary;
    color: $white;
  }
}

#createProject {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 74px;
  height: 74px;
  border-radius: 37px;
  box-sizing: border-box;
}


.button-group {
  display: flex;
  > * {
    flex: 1;
    border-radius: 0;

    $border-size: 10px;
    &:first-child {
      border-top-left-radius: $border-size;
      border-bottom-left-radius: $border-size;
    }

    &:last-child {
      border-top-right-radius: $border-size;
      border-bottom-right-radius: $border-size;
    }
  }
}
</style>
