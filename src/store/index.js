import { createStore } from 'vuex';
import axios from "axios";

export default createStore({
  state: () => ({
    //Даты и время
    currentDate: new Date().toISOString().slice(0, 10),
  }),
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
