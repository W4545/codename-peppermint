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
    server: null,
    serverAuthenticationStatus: false,
    whiteCards: null,
    blackCards: null,
    connectionFailure: false,
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
    },
    setServerAuthenticationStatus(state, status) {
      state.serverAuthenticationStatus = status;
    },
    setWhiteCards(state, cards) {
      state.whiteCards = cards;
    },
    setBlackCards(state, cards) {
      state.blackCards = cards;
    },
    setConnectionFailure(state, failed) {
      state.connectionFailure = failed;
    },
  },
  getters: {
    getDark: state => state.dark,
    getRedirectURL: state => state.redirectURL,
    getServer: state => state.server,
    getGame: state => state.game,
    getServerAuthenticationStatus: state => state.serverAuthenticationStatus,
    getWhiteCards: state => state.whiteCards,
    getBlackCards: state => state.blackCards,
    getWhiteCard: (state, pos) => state.whiteCards[pos],
    getBlackCard: (state, pos) => state.blackCards[pos],
    getConnectionFailure: state => state.connectionFailure,
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersistence.plugin]
});
