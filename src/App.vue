<template>
  <Header />
  <main>
    <div class="nav">
      <navigation />
    </div>
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Navigation from "@/components/Navigation.vue"; // @ is an alias to /src
// import Modal from "./components/Modal.vue";
import Header from "./components/Header.vue";

@Options({
  created: function () {
    if (!localStorage.getItem("project-id")) {
      localStorage.setItem("project-id", "0");
      localStorage.setItem("projects", JSON.stringify({}));
    }
  },
  components: {
    Navigation,
    // Modal,
    Header,
  },
  methods: {
    closeWalletModal: function () {
      this.$store.commit("closeWalletModal");
    },
  },
  computed: {
    walletModalIsActive: function () {
      return this.$store.state.walletModalActive;
    },
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
$black: #222;
$gray-70: rgb(122, 122, 122);
$gray-30: #dbdbdb;
$white: #fefefe;

html,
body,
#app {
  color: $gray-70;
  margin: 0;
  padding: 0;
  min-height: 100%;
  height: 100%;
}

body {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background-color: gray;

  overflow-y: auto;
}

main {
  display: flex;
  width: 100%;
  margin: 0 auto;
}

.center-box {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.row {
  display: flex;
  > * {
    flex: 1;
  }
}

.nav {
  position: sticky;
}

.content {
  flex: 1;
  margin: 10px 100px;
}
// .button {
//   position: relative;
//   text-decoration: none;
//   color: black;
//   border: 1px solid black;
//   padding: 3px 10px;

//   max-height: 100px;

//   &:hover {
//     background-color: whitesmoke;
//   }
// }

.nav-item,
textarea,
input,
button {
  padding: 10px;
  color: $black;
  background-color: $white;
  border-radius: 3px;
  border: 1px solid $gray-30;
}
</style>
