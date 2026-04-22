<template>
  <div
    class="froth"
    :style="{ backgroundColor: creamerColor }"
  >
    <div
      v-if="showFoam"
      v-for="foamIndex in 5"
      :key="foamIndex"
      class="foam"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBeverageStore } from "../stores/beverageStore";

const beverageStore = useBeverageStore();

const selectedCreamer = computed(() =>
  beverageStore.creamers.find(
    (creamer) => creamer.id === beverageStore.currentCreamer
  )
);

const creamerColor = computed(() => {
  return selectedCreamer.value?.color ?? "transparent";
});

const showFoam = computed(() => {
  return selectedCreamer.value?.id !== "c1";
});
</script>

<style lang="scss" scoped>
.froth {
  overflow: visible;
  transform: translateY(400%);
  position: relative;
  height: 20%;
  width: 100%;
  animation: pour-tea 2s 2s forwards;
  z-index: 3;
}

.foam {
  display: block;
  background: #e4e0d2;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  position: absolute;
}

.foam:nth-child(1) {
  top: 0px;
  left: -3px;
}

.foam:nth-child(2) {
  top: 0px;
  left: 55px;
}

.foam:nth-child(3) {
  width: 30px;
  height: 30px;
  border-radius: 40px;
  top: 3px;
  left: 30px;
}

.foam:nth-child(4) {
  width: 30px;
  height: 30px;
  border-radius: 45px;
  top: 5px;
  right: -2px;
}

.foam:nth-child(5) {
  top: 2px;
  right: 10px;
}
</style>
