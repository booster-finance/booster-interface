<template>
  <div class="navigation">
    <nav>
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link :to="{ name: 'Dashboard' }" class="nav-item"
        >Dashboard</router-link
      >
    </nav>
    <!-- <footer>$BOOST: 0.12% <span class="gain">(+10.23%)</span></footer> -->
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Header from "./Header.vue";

@Options({
  components: {
    Header,
  },
})
export default class Navigation extends Vue {}
</script>

<style lang="scss" scoped>
$slimborder: 1px solid rgba(0, 0, 0, 0.3);

nav {
  min-width: 320px;

  a {
    display: block;
    padding: 5px 20px;
    margin: 5px 10px;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }
}


.gain {
  color: greenyellow;
}
</style>
