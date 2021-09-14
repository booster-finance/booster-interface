<template>
  <div class="project-preview">
    <div class="main">
      <header>
        <h2>{{ value.title }}</h2>
        <div class="button" @click="changeStatus">
          Status: {{ value.status }}
        </div>
      </header>

      <p>{{ value.description || "This project has no description." }}</p>
      <a :href="value.link" target="_blank">{{ value.link }}</a>

      <h3>Milestones</h3>
      <MilestoneSlider :value="value.milestones" />
      <!-- TODO: Here we need some kind of ID for the project  -->
      <h3 v-if="funding">Tiers</h3>

      <div id="tier-list" v-if="funding">
        <div
          class="tier-select"
          v-for="(tier, index) of value.tiers"
          v-bind:key="`tier-${index}`"
        >
          <img :src="getTierImage(index)" alt="Image of tier." />
          <p>{{ getTierName(index) }}</p>
          <slider :max="tier.maxBackers" :value="tier.backers" />
          <p>{{ tier.cost }} $</p>
        </div>
      </div>
      <div id="contribute" v-if="funding">
        <span>Support Project Without Reward</span>
        <div class="row">
          <input type="number" value="10" step="0.01" min="0" />
          <div class="button">Fund</div>
        </div>
      </div>

      <h3 v-if="!completed">Funding</h3>
      <Slider
        v-if="!completed"
        :value="calculateCurrentFunding()"
        :max="value.fundingGoal"
      />

      <h4 v-if="voting">Voting</h4>
      <div class="row" v-if="voting">
        <div class="button" id="no">No</div>
        <div class="button" id="yes">Yes</div>
      </div>

      <div id="withdraw" v-if="!funding && !completed">
        <h3>Your contribution</h3>
        <div class="tier-select">
          <img :src="getTierImage(1)" alt="Image of tier." />
          <p>{{ getTierName(1) }}</p>
          <p>{{ value.tiers[1].cost }} $</p>

          <div class="button">Burn To Withdraw Remaining Funds</div>
        </div>
      </div>

      <div class="info" v-if="completed">
        <font-awesome-icon class="icon" :icon="['fas', 'info-circle']" />

        This project has been completed!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Project } from "@/model/Project";
import { defineComponent, PropType } from "vue";
import Tier from "../model/Tiers";
import { Tier as TierInterface } from "../model/Project";
import Slider from "./Slider.vue";
import MilestoneSlider from "./MilestoneSlider.vue";

export default defineComponent({
  name: "ProjectPreview",
  props: {
    value: Object as PropType<Project>,
  },
  components: { Slider, MilestoneSlider },
  computed: {
    funding: function () {
      return this.value?.status == 0;
    },
    working: function () {
      return this.value?.status == 1;
    },
    voting: function () {
      return this.value?.status == 2;
    },
    completed: function () {
      return this.value?.status == 3;
    },
  },

  methods: {
    getTierImage: function (index: number) {
      if (this.value) {
        let img = Tier.getImage(index, this.value.tiers.length);
        console.log(img);

        return `/tiers/${img}`;
      } else return "";
    },
    getTierName: function (index: number) {
      if (this.value) {
        return Tier.getName(index, this.value.tiers.length);
      }
    },
    getSliderFill(tier: TierInterface) {
      return `width: ${((tier.backers / tier.maxBackers) * 100).toFixed(2)}%`;
    },
    calculateCurrentFunding() {
      if (this.value) {
        return this.value.tiers.reduce(
          (acc, current) => (acc += current.backers * current.cost),
          0
        );
      } else return 0;
    },
    changeStatus() {
      this.$emit("changeStatus");
    },
  },
});
</script>

<style lang="scss">
.main > * {
  margin-bottom: 10px;
}

header {
  position: relative;
}

header > .button {
  position: absolute;
  top: 0;
  right: 0;
  // transform: translateY(-50%);
  margin: 0;
  box-sizing: border-box;
}

h2 {
  margin-top: 0;
  padding-bottom: 1rem;
  border-bottom: $border;
}

.project-preview {
  border: $border;
  border-radius: 20px;
  padding: 20px;
  position: relative;
}

#tier-list > *:not(:last-child) {
  margin-bottom: 10px;
}

.tier-select {
  position: relative;
  display: flex;

  @include interactive();

  border: $border;
  border-radius: 10px;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;

  > *:not(:last-child) {
    margin-right: 20px;
  }

  &:hover {
    background-color: whitesmoke;
  }

  img {
    height: 42px;
    width: 42px;
    object-fit: contain;
  }

  p {
    width: 100px;
    text-align: left;
  }
}

#contribute {
  position: relative;
  border: $border;
  padding: 10px;
  border-radius: 10px;

  .button {
    max-width: 100px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }

  span {
    cursor: pointer;
    user-select: none;
    // text-decoration: underline;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;
    display: block;
    box-sizing: border-box;

    ::after {
      content: "$";
      position: absolute;
      left: 5px;
      line-height: 0;
      color: blue;
    }
  }
}

#yes {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  background-color: $green;
}

#no {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: $red;
}

#withdraw {
  margin-top: 40px;
}
</style>
