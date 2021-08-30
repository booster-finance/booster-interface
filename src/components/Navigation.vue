<template>
  <div class="navigation">
    <header class="nav-header">
      <Header />
    </header>
    <nav>
      <router-link to="#">Investing</router-link>
      <router-link to="#">Active</router-link>
      <router-link to="#">Payout</router-link>
      <router-link :to="{ name: 'Dashboard' }">Create Project</router-link>
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

.navigation {
  // width: 25%;
  // min-width: 420px;
  background-color: white;
  // height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

nav {
  // flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;

  a {
    display: inline-block;
    padding: 5px 20px;
    margin: 5px 10px;
    border: 1px solid gray;
  }
  // > * {
  //   // display: block;

  //   padding: 20px;
  //   border-bottom: $slimborder;
  // }
}

// .nav-header {
//   border-bottom: $slimborder;
// }

// footer {
//   padding: 20px;
//   background-color: whitesmoke;
//   font-weight: bold;
//   text-align: right;
//   border-top: $slimborder;
// }

.gain {
  color: greenyellow;
}
</style>
