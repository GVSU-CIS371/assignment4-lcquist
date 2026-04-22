<script setup lang="ts">
import { onMounted } from "vue";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import { auth } from "./firebase";

const beverageStore = useBeverageStore();

async function withGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    beverageStore.message = "";
  } catch (error) {
    console.error(error);
    beverageStore.message = "Google sign-in failed. Please try again.";
  }
}

async function logoutUser() {
  try {
    await signOut(auth);
    beverageStore.message = "Signed out successfully.";
  } catch (error) {
    console.error(error);
    beverageStore.message = "Sign out failed. Please try again.";
  }
}

onMounted(async () => {
  await beverageStore.init();

  onAuthStateChanged(auth, (user) => {
    beverageStore.setUser(user);
  });
});
</script>

<template>
  <main class="drink-maker">
    <div class="preview-area">
      <Beverage :isIced="beverageStore.selectedTemperature === 'Cold'" />
    </div>

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
          v-for="base in beverageStore.bases"
          :key="base.id"
        >
          <input
            v-model="beverageStore.currentBase"
            type="radio"
            :value="base.id"
            name="base"
          />
          {{ base.name }}
        </label>
      </div>

      <div class="control-row">
        <label
          v-for="syrup in beverageStore.syrups"
          :key="syrup.id"
        >
          <input
            v-model="beverageStore.currentSyrup"
            type="radio"
            :value="syrup.id"
            name="syrup"
          />
          {{ syrup.name }}
        </label>
      </div>

      <div class="control-row">
        <label
          v-for="creamer in beverageStore.creamers"
          :key="creamer.id"
        >
          <input
            v-model="beverageStore.currentCreamer"
            type="radio"
            :value="creamer.id"
            name="creamer"
          />
          {{ creamer.name }}
        </label>
      </div>

      <div class="auth-row" v-if="!beverageStore.user">
        <button @click="withGoogle">
          Sign in with Google
        </button>
      </div>

      <div class="auth-row" v-else>
        <span class="user-info">
          Signed in as:
          {{ beverageStore.user.displayName || beverageStore.user.email }}
        </span>
        <button @click="logoutUser">
          Sign Out
        </button>
      </div>

      <div class="name-button-row">
        <input
          v-model="beverageStore.beverageName"
          type="text"
          placeholder="Beverage Name"
        />
        <button
          :disabled="!beverageStore.user"
          @click="beverageStore.makeBeverage()"
        >
          Make Beverage
        </button>
      </div>

      <div
        v-if="beverageStore.message"
        class="message-row"
      >
        {{ beverageStore.message }}
      </div>

      <div
        v-if="!beverageStore.user"
        class="helper-text"
      >
        Please sign in to save your beverage.
      </div>

      <div
        v-if="beverageStore.user && beverageStore.savedBeverages.length > 0"
        class="saved-section"
      >
        <div class="saved-title">Saved Beverages</div>

        <div id="beverage-container" class="control-row saved-row">
          <label
            v-for="beverage in beverageStore.savedBeverages"
            :key="beverage.id"
          >
            <input
              type="radio"
              name="saved-beverage"
              :checked="beverageStore.currentBeverage?.id === beverage.id"
              @change="beverageStore.showBeverage(beverage)"
            />
            {{ beverage.name }}
          </label>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.drink-maker {
  min-height: 100vh;
  background: #966341;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 2rem 1rem;
}

.preview-area {
  position: relative;
  width: 120px;
  height: 150px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.95rem;
  font-size: 0.95rem;
}

.control-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.9rem;
}

.auth-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}

.user-info {
  font-weight: 600;
}

.name-button-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.name-button-row input {
  width: 125px;
  padding: 0.15rem 0.25rem;
}

.name-button-row button {
  padding: 0.15rem 0.35rem;
}

.message-row {
  text-align: center;
}

.helper-text {
  text-align: center;
}

.saved-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.saved-title {
  font-weight: 600;
}

.saved-row {
  max-width: 520px;
}
</style>