<template>
  <div class="create-project">
    <div class="left">
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
    </div>
    <div class="right">
      <tier-list :tiers="tiers" @add="addTier" @remove="removeTier" />
      <MilestoneList
        :milestones="milestones"
        @add="addMilestone"
        @remove="removeMilestone"
        @addObjective="addObjective"
        @removeObjective="removeObjective"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Project, ProjectPhase, Reward } from "../model/Project";
import TierList from "../components/TierList.vue";
import MilestoneList from "@/components/MilestoneList.vue";

const Sticker: Reward = {
  title: "Sticker",
  description: "A sticker with the project Logo.",
};
const theGame: Reward = {
  title: "The Game",
  description: "A digital copy of the game.",
};

const thePhysicalGame: Reward = {
  title: "The Game",
  description: "A tangible copy of the game.",
};

const betaAccess: Reward = {
  title: "Beta Access",
  description: "Access to the beta version of the game.",
};

const gaming: Project = {
  id: 0,
  title: "Fred the Knight",
  status: ProjectPhase.Edit,
  description:
    "It's the best point and click adventure ever made. Fred the Knight has to find his big love Princess Penelope.",
  link: "https://fred-the-game.com",
  tiers: [
    {
      cost: 10,
      rewards: [Sticker],
    },
    {
      cost: 50,
      rewards: [Sticker, theGame],
    },
    {
      cost: 150,
      rewards: [Sticker, thePhysicalGame, betaAccess],
    },
  ],
  milestones: [{ title: "Test", objectives: ["Eat pommes", "Have fun"] }],
};

export default defineComponent({
  components: { TierList, MilestoneList },

  data: function () {
    return gaming;
  },
  methods: {
    addTier() {
      this.$data.tiers.push({ cost: 100, rewards: [] });
    },
    removeTier(index: number) {
      this.$data.tiers.splice(index, 1);
    },
    addMilestone() {
      this.$data.milestones.push({
        title: "Unnamed Milestone",
        objectives: [],
      });
    },
    removeMilestone(index: number) {
      this.$data.milestones.splice(index, 1);
    },
    addObjective(index: number) {
      this.$data.milestones[index].objectives.push("");
      this.$data.milestones[index];
    },
    removeObjective(milestoneIdx: number, objectiveIdx: number) {
      this.$data.milestones[milestoneIdx].objectives.splice(objectiveIdx, 1);
    },
    // validateAndSubmit: function () {
    //   let idStr = localStorage.getItem("project-id") || "0";
    //   let id = parseInt(idStr);
    //   let projectStr = localStorage.getItem("projects") || "";
    //   let projects = JSON.parse(projectStr);

    //   id++;
    //   this.$data.id = id;
    //   projects[id] = this.$data;

    //   localStorage.setItem("project-id", JSON.stringify(id));
    //   localStorage.setItem("projects", JSON.stringify(projects));

    //   this.$router.push({ name: "EditProject", params: { id } });
    // },
  },
});
</script>

<style lang="scss" scoped>
.create-project {
  $border: 1px solid rgb(224, 224, 224);
  display: flex;
  margin-bottom: 50vh;

  border: $border;
  border-radius: 10px;

  > * {
    flex: 1;
    margin: 20px;
  }

  button {
    margin-top: 50px;
  }
}
</style>
