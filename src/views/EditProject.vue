<template>
  <div class="content">
    <p v-if="!project">Loading ...</p>
    <div v-else class="project">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>

    <h3>Milestones</h3>
      <ul>
          <li></li>
      </ul>

      <button>Add Milestone</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  mounted: function () {
    //     let projectsStr = localStorage.getItem("projects") || "[]";
    //     let projects = JSON.parse(projectsStr);
    //     this.$data.projects = Object.values(projects);
    //     console.log(projects);

    let projectsStr = localStorage.getItem("projects") || "[]";
    let projects = JSON.parse(projectsStr);
    const id = this.$route.params.id;

    this.$data.project = projects[id];
  },
  components: {},
  data: function () {
    return {
      project: null,
    };
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
</style>
