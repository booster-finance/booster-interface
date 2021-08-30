<template>
  <div class="content">
    <ul>
      <li v-for="(project, idx) of projects" :key="'project-' + idx">
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
          {{ project.title }}
        </router-link>
      </li>
    </ul>

    <router-link to="create">Create New Project</router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  mounted: function () {
    let projectsStr = localStorage.getItem("projects") || "[]";
    let projects = JSON.parse(projectsStr);
    this.$data.projects = Object.values(projects);
    console.log(projects);
  },
  components: {},
  data: function () {
    return {
      projects: [],
    };
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
</style>
