<template>
  <Header />
  <main>
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Navigation from "@/components/Navigation.vue"; // @ is an alias to /src
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
html,
body,
#app {
  color: $gray-70;
  margin: 0;
  padding: 0;
  min-height: 100%;
  height: 100%;
}

main {
  background: linear-gradient(10deg, whitesmoke, $white);
}

#background-icon {
  width: 12.5%;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  position: relative;
  flex: 1;
  align-items: center;

  &::before {
    position: absolute;

    content: "";
    width: 100%;
    height: 100%;
    background-size: 33%;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.03;

    background-image: url("/booster.svg");
  }
}

body {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background-color: gray;

  overflow-y: auto;
}

.content {
  display: flex;
  justify-content: center;
}

.create-project,
.dashboard,
.project-preview {
  width: 720px;
  max-width: 100%;
  border: $border;
  border-radius: 20px;
  padding: 20px;
  position: relative;
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
  margin: 10px 10px;
}
.button {
  @include interactive();

  position: relative;
  text-decoration: none;
  color: white;
  font-weight: bold;
  border: $border;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: $primary;
  padding: 7px 15px;

  // max-height: 100px;
  // box-shadow: 1px 1px 3px rgba($color: #000, $alpha: 0.3);

  &.disabled {
    background-color: whitesmoke;
    color: gray;
    cursor: not-allowed;
    pointer-events: none;

    &:hover {
      background-color: whitesmoke;
    }

    &:active {
      box-shadow: none;
    }
  }

  &:hover {
    background-color: lighten($primary, 3%);
  }

  &:active {
    box-shadow: inset 1px 2px 5px rgba($color: black, $alpha: 1);
  }
}

.info {
  border: $border;
  padding: 30px;
  background-color: $gray-30;
  color: $white;
  font-weight: bold;
  text-align: center;
}

textarea,
input,
button {
  @include input();
}

button {
  color: $gray-70;
}
</style>
