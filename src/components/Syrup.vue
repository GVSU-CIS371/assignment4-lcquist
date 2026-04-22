<template>
  <div
    class="syrup"
    :style="{ background: syrupBackground }"
  ></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBeverageStore } from "../stores/beverageStore";

const beverageStore = useBeverageStore();

const syrupColor = computed(() => {
  const selectedSyrup = beverageStore.syrups.find(
    (syrup) => syrup.id === beverageStore.currentSyrup
  );

  return selectedSyrup?.color ?? "transparent";
});

const syrupBackground = computed(() => {
  if (syrupColor.value === "transparent") {
    return "transparent";
  }

  return `repeating-linear-gradient(
    45deg,
    ${syrupColor.value},
    ${syrupColor.value} 10px,
    rgba(255, 255, 255, 0.18) 10px,
    rgba(255, 255, 255, 0.18) 20px
  )`;
});
</script>

<style lang="scss" scoped>
.syrup {
  transform: translateY(400%);
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;
}
</style>
