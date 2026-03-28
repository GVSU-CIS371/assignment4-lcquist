<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

const beverageStore = useBeverageStore();
</script>

<template>
  <main class="drink-maker">
    <Beverage :isIced="beverageStore.selectedTemperature === 'Cold'" />

    <div class="controls">
      <div class="control-row">
        <label>
          <input
            v-model="beverageStore.selectedTemperature"
            type="radio"
            value="Hot"
            name="temperature"
          />
          Hot
        </label>
        <label>
          <input
            v-model="beverageStore.selectedTemperature"
            type="radio"
            value="Cold"
            name="temperature"
          />
          Cold
        </label>
      </div>

      <div class="control-row">
        <label
          v-for="base in beverageStore.baseOptions"
          :key="base.id"
        >
          <input
            v-model="beverageStore.selectedBase"
            type="radio"
            :value="base.name"
            name="base"
          />
          {{ base.name }}
        </label>
      </div>

      <div class="control-row">
        <label
          v-for="syrup in beverageStore.syrupOptions"
          :key="syrup.id"
        >
          <input
            v-model="beverageStore.selectedSyrup"
            type="radio"
            :value="syrup.name"
            name="syrup"
          />
          {{ syrup.name }}
        </label>
      </div>

      <div class="control-row">
        <label
          v-for="creamer in beverageStore.creamerOptions"
          :key="creamer.id"
        >
          <input
            v-model="beverageStore.selectedCreamer"
            type="radio"
            :value="creamer.name"
            name="creamer"
          />
          {{ creamer.name }}
        </label>
      </div>

      <div class="name-button-row">
        <input
          v-model="beverageStore.beverageName"
          type="text"
          placeholder="Name"
        />
        <button @click="beverageStore.makeBeverage()">
          Make Beverage
        </button>
      </div>

      <div id="beverage-container" class="control-row saved-row">
        <label
          v-for="beverage in beverageStore.savedBeverages"
          :key="beverage.name"
        >
          <input
            type="radio"
            name="saved-beverage"
            @change="beverageStore.showBeverage(beverage)"
          />
          {{ beverage.name }}
        </label>
      </div>
    </div>
  </main>
</template>

<style scoped>
.drink-maker {
  min-height: 100vh;
  background: #8b5a3c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  font-size: 0.95rem;
}

.control-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.name-button-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.name-button-row input {
  width: 130px;
  padding: 0.15rem 0.25rem;
}

.name-button-row button {
  padding: 0.15rem 0.35rem;
}

.saved-row {
  max-width: 500px;
}
</style>