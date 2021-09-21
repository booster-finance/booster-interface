<template>
  <div class="home">
    <ProjectPreview :value="projects[0]" @changeStatus="changeStatus" />
  </div>
</template>

<script lang="ts">
import { ProjectPhase, Project } from "@/model/Project";
import ProjectPreview from "../components/ProjectPreview.vue";

const gaming: Project = {
  id: 0,
  title: "Fred the Knight",
  status: ProjectPhase.Investment,
  link: "https://fred-the-game.com",
  fundingGoal: 3000,
  description:
    "It's the best point and click adventure ever made. Fred the Knight has to find his big love Princess Penelope.",
  tiers: [
    {
      backers: 75,
      maxBackers: 100,
      cost: 10,
    },
    {
      backers: 15,
      maxBackers: 50,
      cost: 50,
    },
    {
      backers: 3,
      maxBackers: 10,
      cost: 150,
    },
  ],
  milestones: [
    {
      releaseDate: Date.now(),
      releasePercentage: 10,
    },
    {
      releaseDate: Date.now() + 4000000000,
      releasePercentage: 20,
    },
    {
      releaseDate: Date.now() + 6000000000,
      releasePercentage: 50,
    },
    {
      releaseDate: Date.now() + 10000000000,
      releasePercentage: 30,
    },
  ],
};

import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { ProjectPreview },
  data: function () {
    return {
      projects: [gaming],
    };
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

