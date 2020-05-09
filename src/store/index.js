import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import vuetify from "../plugins/vuetify";

Vue.use(Vuex);

const vuexPersistence = new VuexPersistence({
  reducer: state => ({
    dark: state.dark,
    redirectURL: state.redirectURL
  })
});

export default new Vuex.Store({
  state: {
    dark: false,
    redirectURL: null,
    game: null,
    server: null
  },
  mutations: {
    toggleDark(state) {
      state.dark = !state.dark;
      vuetify.framework.theme.dark = state.dark;
    },
    assignRedirectURL(state, redirectURL) {
      state.redirectURL = redirectURL;
    },
    updateGame(state, game) {
      state.game = game;
    },
    setServer(state, server) {
      state.server = server;
    }
  },
  getters: {
    getDark: state => state.dark,
    getRedirectURL: state => state.redirectURL,
    getServer: state => state.server,
    getGame: state => state.game,
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersistence.plugin]
});
