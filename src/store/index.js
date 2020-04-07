import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import vuetify from "../plugins/vuetify";

Vue.use(Vuex);

let vuexPersistence = new VuexPersistence({
  reducer: state => ({dark: state.dark})
});

export default new Vuex.Store({
  state: {
    dark: false
  },
  mutations: {
    toggleDark(state) {
      state.dark = !state.dark;
      vuetify.framework.theme.dark = state.dark;
    }
  },
  getters: {
    getDark: state => state.dark
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersistence.plugin]
})
