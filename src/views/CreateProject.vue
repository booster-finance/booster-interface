<template>
  <div class="create-project">
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
    <h3>Funding Goal</h3>
    <input type="number">
    <h3>Link</h3>
    <input v-model="link" name="link" type="text" />
    <tier-list :tiers="tiers" @add="addTier" @remove="removeTier" />
    <MilestoneList
      :milestones="milestones"
      @add="addMilestone"
      @remove="removeMilestone"
      @allocChanged="allocChanged"
      @dateChanged="dateChanged"
    />

    <div class="submit">
      <div
        id="validateBtn"
        class="button"
        v-if="!createReady"
        @click="validate"
      >
        Validate
      </div>
      <div id="createBtn" class="button" v-if="createReady">Create</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Project, ProjectPhase } from "../model/Project";
import TierList from "../components/TierList.vue";
import MilestoneList from "@/components/MilestoneList.vue";

const gaming: Project = {
  id: 0,
  title: "Fred the Knight",
  status: ProjectPhase.Investment,
  fundingGoal: 3000,
  description:
    "It's the best point and click adventure ever made. Fred the Knight has to find his big love Princess Penelope.",
  link: "https://fred-the-game.com",
  tiers: [
    {
      backers: 20,
      maxBackers: 100,
      cost: 10,
      // rewards: [Sticker],
    },
    {
      backers: 20,
      maxBackers: 50,
      cost: 50,
      // rewards: [Sticker, theGame],
    },
    {
      backers: 2,
      maxBackers: 10,
      cost: 150,
      // rewards: [Sticker, thePhysicalGame, betaAccess],
    },
  ],
  milestones: [],
};

export default defineComponent({
  components: { TierList, MilestoneList },

  data: function () {
    return gaming;
  },
  methods: {
    addTier() {
      this.$data.tiers.push({
        backers: 0,
        maxBackers: 10,
        cost: 100,
        // rewards: [],
      });
    },
    removeTier(index: number) {
      this.$data.tiers.splice(index, 1);
    },
    addMilestone() {
      this.$data.milestones.push({
        releaseDate: -1,
        releasePercentage: 0,
        releaseAlloc: 1,
      });
      this.updateMilestoneAlloc();
    },
    removeMilestone(index: number) {
      this.$data.milestones.splice(index, 1);
    },
    allocChanged(index: number, alloc: number) {
      let milestone = this.milestones[index];
      milestone.releaseAlloc = alloc;
      this.milestones.splice(index, 1, milestone);
      this.updateMilestoneAlloc();
    },
    dateChanged(index: number, date: number) {
      let milestone = this.milestones[index];
      milestone.releaseDate = date;
      this.milestones.splice(index, 1, milestone);
    },
    updateMilestoneAlloc() {
      let totalReleaseAlloc = 0;
      this.milestones.forEach((milestone) => {
        totalReleaseAlloc += milestone.releaseAlloc;
        console.log("TOTAL REL ALL:", totalReleaseAlloc);
      });

      console.log(totalReleaseAlloc);

      this.milestones.forEach((milestone) => {
        milestone.releasePercentage =
          milestone.releaseAlloc / totalReleaseAlloc;
      });

      this.milestones.splice(0, this.milestones.length, ...this.milestones);
    },
  },
});
</script>

<style lang="scss" scoped>
.create-project {
  display: flex;
  flex-direction: column;
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

.submit {
  display: flex;
  > * {
    flex: 1;
  }
}
</style>
