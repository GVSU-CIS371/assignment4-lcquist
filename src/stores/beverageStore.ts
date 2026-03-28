import { defineStore } from "pinia";
import { ref } from "vue";


import bases from "../data/bases.json";
import creamers from "../data/creamers.json";
import syrups from "../data/syrups.json";
import temperatures from "../data/tempretures.json";

type BeverageRecipe = {
  name: string;
  base: string;
  creamer: string;
  syrup: string;
  temperature: string;
};

export const useBeverageStore = defineStore("beverageStore", () => {

  const baseOptions = ref(bases);
  const creamerOptions = ref(creamers);
  const syrupOptions = ref(syrups);
  const temperatureOptions = ref(temperatures);

  
  const selectedBase = ref("");
  const selectedCreamer = ref("");
  const selectedSyrup = ref("");
  const selectedTemperature = ref("");
  const beverageName = ref("");

 
  const savedBeverages = ref<BeverageRecipe[]>([]);

  function makeBeverage() {
    const trimmedName = beverageName.value.trim();

    if (
      trimmedName === "" ||
      selectedBase.value === "" ||
      selectedCreamer.value === "" ||
      selectedSyrup.value === "" ||
      selectedTemperature.value === ""
    ) {
      return;
    }

    const newDrink: BeverageRecipe = {
      name: trimmedName,
      base: selectedBase.value,
      creamer: selectedCreamer.value,
      syrup: selectedSyrup.value,
      temperature: selectedTemperature.value,
    };

    savedBeverages.value.push(newDrink);
  }

  function showBeverage(beverage: BeverageRecipe) {
    selectedBase.value = beverage.base;
    selectedCreamer.value = beverage.creamer;
    selectedSyrup.value = beverage.syrup;
    selectedTemperature.value = beverage.temperature;
    beverageName.value = beverage.name;
  }

  return {
    baseOptions,
    creamerOptions,
    syrupOptions,
    temperatureOptions,
    selectedBase,
    selectedCreamer,
    selectedSyrup,
    selectedTemperature,
    beverageName,
    savedBeverages,
    makeBeverage,
    showBeverage,
  };
});