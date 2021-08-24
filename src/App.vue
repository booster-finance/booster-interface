<template>
  <Navigation />
  <div class="content">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Navigation from "@/components/Navigation.vue"; // @ is an alias to /src

@Options({
  components: {
    Navigation,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100%;
  height: 100%;
}

body {
  font-family: "Besley", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: gray;
}

#app {
  display: flex;
}

.content {
  flex: 1;
  background-color: red;
}

a {
  text-decoration: none;
  color: black;
}
</style>
