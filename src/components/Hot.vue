<template>
  <div id="steam">
    <div class="stream" v-for="steamIndex in 3" :key="steamIndex"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#steam {
  position: absolute;
  width: 100%;
  height: 60px;
  top: -58px;
  left: 0;
  pointer-events: none;
}

.stream {
  position: absolute;
  bottom: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  animation: steam-rise 2.4s infinite ease-in-out;
}

.stream:nth-child(1) {
  left: 10px;
  animation-delay: 0s;
}

.stream:nth-child(2) {
  left: 42px;
  animation-delay: 0.5s;
}

.stream:nth-child(3) {
  left: 70px;
  animation-delay: 1s;
}

@keyframes steam-rise {
  0% {
    transform: translateY(0) scale(0.7);
    opacity: 0;
  }
  25% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-38px) scale(1.3);
    opacity: 0;
  }
}
</style>
