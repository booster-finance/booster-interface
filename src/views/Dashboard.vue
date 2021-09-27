<template>
  <div class="dashboard">
    <InfoBox v-if="projects.length == 0">
      You created no projects so far.</InfoBox
    >

    <ul>
      <li
        v-for="(project, idx) of projects"
        :key="'project-' + idx"
        class="project-row"
      >
        <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
          <div class="status" :class="getClassFromStatus(project.status)">
            {{ getClassFromStatus(project.status) }}
          </div>
          <span>{{ project.title }}</span>
          <span>Alloc {{ project.minAlloc }} -> {{ project.maxAlloc }}</span>
        </router-link>
      </li>
    </ul>

    <router-link to="create" class="button">Create New Project</router-link>
  </div>
</template>

<script lang="ts">
import { ProjectPhase } from "@/model/Project";
import { Vue, Options } from "vue-class-component";
import InfoBox from "../components/InfoBox.vue";

@Options({
  mounted: function () {
    let projectsStr = localStorage.getItem("projects") || "[]";
    let projects = JSON.parse(projectsStr);
    this.$data.projects = Object.values(projects);
    console.log(projects);
  },
  components: { InfoBox },
  data: function () {
    return {
      projects: [],
    };
  },
  methods: {
    getClassFromStatus: function (status: ProjectPhase) {
      switch (status) {
        case ProjectPhase.Completed:
          return "comüplete";
        case ProjectPhase.Working:
          return "work";
        case ProjectPhase.Voting:
          return "vote";
        case ProjectPhase.Investment:
        default:
          return "invest";
      }
    },
  },
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  width: 100%;

  li {
    width: 100%;
  }
}

.project-row a {
  width: 100%;
  display: flex;
  text-decoration: none;
  color: black;
  border: 1px solid black;
  padding: 10px 20px;
  box-sizing: border-box;
  align-items: center;

  > span {
    flex: 1;
    padding: 10px;
  }
}

.status {
  // width: 32px;
  // height: 32px;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
  text-transform: uppercase;
}

.invest {
  background-color: cyan;
}
.payout {
  background-color: orange;
}
.spend {
  background-color: magenta;
}
.edit {
  background-color: gray;
}
</style>
