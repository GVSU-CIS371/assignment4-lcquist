<template>
  <div class="mug">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.mug {
  position: relative;
  width: 110px;
  height: 86px;
  border: 6px solid #d9d9d9;
  border-radius: 0.4em 0.4em 2.2em 2.2em;
  overflow: visible;
  background: transparent;
  box-sizing: border-box;
}

.mug::after {
  content: "";
  position: absolute;
  right: -28px;
  top: 16px;
  width: 28px;
  height: 28px;
  border: 6px solid #d9d9d9;
  border-left: none;
  border-radius: 0 18px 18px 0;
  box-sizing: border-box;
}
</style>