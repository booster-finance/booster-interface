<template>
  <div class="setup">
      <p>This page is for an initial setup. Use it to deploy the factory contract to the current chain.</p>
      <button @click="setup">Setup</button>
      <div>{{contractAddress}}</div>
  </div>
</template>

<script lang="ts">
import ProjectFactory from "@/web3/projectFactory";
import { defineComponent} from "vue";
export default defineComponent({
    data: function(){
        return {
            contractAddress: ""
        }
    },
    methods: {

        async setup(){
            try{
                let contract = await ProjectFactory.createContract()
                this.contractAddress = contract.options.address
            }catch(e){
                console.log(e)
            }
        }
    }
})
    </script>