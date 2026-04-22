<template>
  <div id="condensation">
    <div class="flake" v-for="flakeIndex in 3" :key="flakeIndex"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#condensation {
  position: absolute;
  width: 100%;
  height: 50px;
  top: -42px;
  left: 0;
  pointer-events: none;
}

.flake {
  position: absolute;
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.45);
}

.flake::before {
  content: "✻";
  font-size: 20px;
  line-height: 16px;
}

.flake:nth-child(1) {
  left: 8px;
  top: 10px;
}

.flake:nth-child(2) {
  left: 38px;
  top: 0px;
}

.flake:nth-child(3) {
  left: 66px;
  top: 8px;
}
</style>
