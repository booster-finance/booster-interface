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
  created: function () {
    if (!localStorage.getItem("project-id")) {
      localStorage.setItem("project-id", "0");
      localStorage.setItem("projects", JSON.stringify({}));
    }
  },
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
  // background-color: gray;

  overflow-y: auto;
}

a {
  text-decoration: none;
  color: black;
  border: 1px solid black;
  padding: 3px 10px;

  &:hover {
    background-color: whitesmoke;
  }
}
input,
button {
  padding: 10px;
}
</style>
