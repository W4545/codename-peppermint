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
    gameSettings: {
      name: null,
      maxPlayers: null,
      isPublic: null,
    },
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
    updateMaxPlayers(state, maxPlayers) {
      state.gameSettings.maxPlayers = maxPlayers;
    },
    updateIsPublic(state, isPublic) {
      state.gameSettings.isPublic = isPublic;
    },
    updateName(state, name) {
      state.gameSettings.name = name;
    },
    setServer(state, server) {
      state.server = server;
    }
  },
  getters: {
    getDark: state => state.dark,
    getRedirectURL: state => state.redirectURL,
    getGameSettings: state => state.gameSettings,
    getMaxPlayers: state => state.gameSettings.maxPlayers,
    getIsPublic: state => state.gameSettings.isPublic,
    getName: state => state.gameSettings.name,
    getServer: state => state.server,
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersistence.plugin]
});
