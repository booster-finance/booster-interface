<template>
  <list-item class="tier-input">
    <img :src="`tiers/${image}`" alt="" />
    <div class="name">{{ name }}</div>
    <div class="backers">
      <font-awesome-icon class="icon" :icon="['fas', 'user']" />
      <input
        type="number"
        step="1"
        min="0"
        :value="value.maxBackers"
        @input="backersChanged"
      />
    </div>
    <div class="cost">
      <input
        :value="value.cost"
        @input="costChanged"
        type="number"
        step="5"
        min="0"
      />
      <span>$</span>
    </div>
  </list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tier from "../model/Tiers";
import ListItem from "./ListItem.vue";

export default defineComponent({
  components: { ListItem },
  name: "Tier",
  props: {
    image: String,
    name: String,
    value: {
      type: Tier,
      required: true,
    },
  },
  methods: {
    backersChanged: function (event) {
      this.tierChanged({
        cost: this.value.cost,
        maxBackers: event.target.value,
      });
    },
    costChanged: function (event) {
      this.tierChanged({
        cost: event.target.value,
        maxBackers: this.value.maxBackers,
      });
    },
    tierChanged: function ({ cost = null, maxBackers = null }) {
      this.$emit("changed", {
        cost,
        maxBackers,
        backers: 0,
      });
    },
  },
});
</script>

<style lang="scss">
.tier-list .remove-btn {
  margin-right: 5px;
}
</style>

<style lang="scss" scoped>
$border: 1px solid rgb(224, 224, 224);

.backers,
.cost {
  position: relative;
}

.cost input {
  width: 100%;
  min-width: 0;
}

.name,
.backers,
.cost {
  flex: 1;
  margin: 5px;
}

.name {
  margin-left: 10px;
}

h4 {
  margin: 0;
  display: block;
}

img {
  display: block;
  flex: 0 0 40px;
  margin: 0 auto;
  height: 20px;
  width: 60px;
  object-fit: contain;
  // padding: 10px;
  // background-color: rgb(247, 247, 247);
  border-right: $border;
  margin-right: 5px;
}

.backers {
  position: relative;
  // display: flex;
  align-items: center;
  @include input();
  padding: 0;

  svg {
    position: absolute;
    left: 10px;
    color: $gray-70;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    margin: 0;
    border: none;
    width: 100%;
  }
}

input {
  padding-left: 40px;
  box-sizing: border-box;
}

.cost {
  position: relative;

  span {
    top: 50%;
    position: absolute;
    left: 10px;
    line-height: 0;
    font-weight: bold;
  }
}
</style>
