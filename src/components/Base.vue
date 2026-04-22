<template>
  <div
    class="baseBeverage"
    :style="{ backgroundColor: baseColor }"
  ></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBeverageStore } from "../stores/beverageStore";

const beverageStore = useBeverageStore();

const baseColor = computed(() => {
  const selectedBase = beverageStore.bases.find(
    (base) => base.id === beverageStore.currentBase
  );

  return selectedBase?.color ?? "transparent";
});
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  animation: pour-tea 2s;
  z-index: 1;
}
</style>