import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
} from "firebase/firestore";

import { db } from "../firebase";
import temperatures from "../data/tempretures.json"; 

type IngredientOption = {
  id: string;
  name: string;
  color: string;
};

type TemperatureOption = {
  id: string;
  name: string;
};

type BeverageRecipe = {
  id: string;
  name: string;
  base: string;
  creamer: string;
  syrup: string;
  temperature: string;
  userId: string;
};

export const useBeverageStore = defineStore("beverageStore", () => {
  const bases = ref<IngredientOption[]>([]);
  const creamers = ref<IngredientOption[]>([]);
  const syrups = ref<IngredientOption[]>([]);
  const temperatureOptions = ref<TemperatureOption[]>(
  temperatures as unknown as TemperatureOption[]
);

  const currentBase = ref("");
  const currentCreamer = ref("");
  const currentSyrup = ref("");
  const selectedTemperature = ref("");
  const beverageName = ref("");

  const savedBeverages = ref<BeverageRecipe[]>([]);
  const currentBeverage = ref<BeverageRecipe | null>(null);

  const user = ref<User | null>(null);
  const message = ref("");

  let beveragesUnsubscribe: Unsubscribe | null = null;

  async function loadIngredients() {
    const baseSnapshot = await getDocs(collection(db, "bases"));
    const creamerSnapshot = await getDocs(collection(db, "creamers"));
    const syrupSnapshot = await getDocs(collection(db, "syrups"));

    bases.value = baseSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      color: doc.data().color,
    }));

    creamers.value = creamerSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      color: doc.data().color,
    }));

    syrups.value = syrupSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      color: doc.data().color,
    }));

    if (bases.value.length > 0 && currentBase.value === "") {
      currentBase.value = bases.value[0].id;
    }

    if (creamers.value.length > 0 && currentCreamer.value === "") {
      currentCreamer.value = creamers.value[0].id;
    }

    if (syrups.value.length > 0 && currentSyrup.value === "") {
      currentSyrup.value = syrups.value[0].id;
    }

    if (selectedTemperature.value === "") {
  selectedTemperature.value = "Hot";
    }
  }

  async function init() {
    await loadIngredients();
  }

  function setUser(newUser: User | null) {
    user.value = newUser;

    if (beveragesUnsubscribe) {
      beveragesUnsubscribe();
      beveragesUnsubscribe = null;
    }

    if (!newUser) {
      savedBeverages.value = [];
      currentBeverage.value = null;
      return;
    }

    const beveragesQuery = query(
      collection(db, "beverages"),
      where("userId", "==", newUser.uid)
    );

    beveragesUnsubscribe = onSnapshot(beveragesQuery, (snapshot) => {
      savedBeverages.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        base: doc.data().base,
        creamer: doc.data().creamer,
        syrup: doc.data().syrup,
        temperature: doc.data().temperature,
        userId: doc.data().userId,
      }));

      if (currentBeverage.value) {
        const updatedBeverage = savedBeverages.value.find(
          (beverage) => beverage.id === currentBeverage.value?.id
        );

        if (updatedBeverage) {
          showBeverage(updatedBeverage);
        } else {
          currentBeverage.value = null;
        }
      }
    });
  }

  async function makeBeverage() {
    const trimmedName = beverageName.value.trim();

    if (!user.value) {
      message.value = "No user logged in, please sign in first.";
      return;
    }

    if (
      trimmedName === "" ||
      currentBase.value === "" ||
      currentCreamer.value === "" ||
      currentSyrup.value === "" ||
      selectedTemperature.value === ""
    ) {
      message.value =
        "Please complete all beverage options and the name before making a beverage.";
      return;
    }

    const newDrink = {
      name: trimmedName,
      base: currentBase.value,
      creamer: currentCreamer.value,
      syrup: currentSyrup.value,
      temperature: selectedTemperature.value,
      userId: user.value.uid,
    };

    await addDoc(collection(db, "beverages"), newDrink);

    message.value = `Beverage ${trimmedName} made successfully!`;
  }

  function showBeverage(beverage: BeverageRecipe) {
    currentBase.value = beverage.base;
    currentCreamer.value = beverage.creamer;
    currentSyrup.value = beverage.syrup;
    selectedTemperature.value = beverage.temperature;
    beverageName.value = beverage.name;
    currentBeverage.value = beverage;
  }

  return {
    bases,
    creamers,
    syrups,
    temperatureOptions,
    currentBase,
    currentCreamer,
    currentSyrup,
    selectedTemperature,
    beverageName,
    savedBeverages,
    currentBeverage,
    user,
    message,
    init,
    setUser,
    makeBeverage,
    showBeverage,
  };
});