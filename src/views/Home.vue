<template>
  <div class="home">
    <spinner v-if="loading" />

    <p v-if="!loading && projects.length == 0">No projects were created yet</p>
    <ProjectPreview
      v-if="!loading && projects.length > 0"
      :value="projects[0]"
      @changeStatus="changeStatus"
    />
  </div>
</template>

<script lang="ts">
import { ProjectPhase, Project } from "@/model/Project";
import ProjectPreview from "../components/ProjectPreview.vue";

import { defineComponent } from "vue";
import ProjectFactory from "@/web3/projectFactory";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "Home",
  components: { ProjectPreview, Spinner },
  data: function () {
    return {
      loading: true,
      projects: [],
    };
  },
  mounted: async function () {
    console.log("Load projects ...");
    if (this.$store.state.factoryContractAddress) {
      this.projects = await ProjectFactory.getProjects(
        this.$store.state.factoryContractAddress
      );

      this.loading = false;
      console.log("Loaded projects ", this.projects);
    }
  },
  methods: {
    changeStatus: function () {
      let project = this.projects[0];
      project.status = (this.projects[0].status + 1) % 4;
      this.projects.splice(0, 1, project);

      console.log("CHANGE STATUS", this.projects[0].status);
    },
  },
});
</script>

