import { defineStore } from "pinia";
import util from "../util";

export const useCounterStore = defineStore("counter", {
  state: () => {
    const count = util.getCache();
    console.log(count);
    return { count };
  },
  // state: () => ({ count: util.getCache() }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
