<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ToDoWithoutStore />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ToDoWithoutStore from "@/components/ToDoWithoutStore.vue";

@Component({
  components: {
    ToDoWithoutStore
  }
})
export default class Home extends Vue {}
</script>
