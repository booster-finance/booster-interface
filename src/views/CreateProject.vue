<template>
  <div class="content">
    <form class="create-project" @submit.prevent="validateAndSubmit">
      <h3>Title</h3>
      <input v-model="title" name="title" type="text" />
      <h3>Description</h3>
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        maxlength="768"
        v-model="description"
      ></textarea>
      <h3>Link</h3>
      <input v-model="link" name="link" type="text" />
      <h3>Interest</h3>
      <input
        v-model="interest"
        name="interest"
        type="number"
        id=""
        step="0.01"
      />
      <h3>Min Investment</h3>
      <input v-model="minInvest" name="minInvest" type="number" id="" />
      <h3>Max Investment</h3>
      <input v-model="maxInvest" name="maxInvest" type="number" id="" />
      <h3>Min Allocation</h3>
      <input v-model="minAlloc" name="minAlloc" type="number" id="" />
      <h3>Max Allocation</h3>
      <input v-model="maxAlloc" name="maxAlloc" type="number" id="" />
      <button>Validate</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Project from "../model/Project";

const gaming: Project = {
  id: 0,
  title: "Fred the Knight",
  description:
    "It's the best point and click adventure ever made. Fred the Knight has to find his big love Prinvess Penelope.",
  link: "https://fred-the-game.com",
  interest: 0.25,
  minInvest: 10,
  maxInvest: 10000,
  minAlloc: 1000000,
  maxAlloc: 1300000,
};

@Options({
  components: {},
  data: function () {
    return gaming;
  },
  methods: {
    validateAndSubmit: function () {
      let idStr = localStorage.getItem("project-id") || "0";
      let id = parseInt(idStr);
      let projectStr = localStorage.getItem("projects") || "";
      let projects = JSON.parse(projectStr);

      id++;
      this.$data.id = id;
      projects[id] = this.$data;

      localStorage.setItem("project-id", JSON.stringify(id));
      localStorage.setItem("projects", JSON.stringify(projects));
    },
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.create-project {
  margin: 100px;
  display: flex;
  flex-direction: column;

  padding-bottom: 200px;

  button {
    margin-top: 50px;
  }
}

textarea {
}
</style>
