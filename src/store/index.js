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
    dark: false,
    redirectURL: null
  },
  mutations: {
    toggleDark(state) {
      state.dark = !state.dark;
      vuetify.framework.theme.dark = state.dark;
    },
    assignRedirectURL(state, redirectURL) {
      state.redirectURL = redirectURL;
    }
  },
  getters: {
    getDark: state => state.dark,
    getRedirectURL: state => state.redirectURL,
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersistence.plugin]
})
