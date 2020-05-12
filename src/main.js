import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/analytics'
import io from 'socket.io-client'
import Events from './Events'

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAbkUYtqdCC0sPMjbPhMc2WJuO-_41nmyU",
  authDomain: "codename-peppermint.firebaseapp.com",
  databaseURL: "https://codename-peppermint.firebaseio.com",
  projectId: "codename-peppermint",
  storageBucket: "codename-peppermint.appspot.com",
  messagingSenderId: "802200761049",
  appId: "1:802200761049:web:737b51a2708c48d55c44c8",
  measurementId: "G-9Z8X04133H"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


let vue = new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
});

const server = io('http://localhost:3000');
vue.$store.commit('setServer', server);

server.on(Events.server.DEBUG, (debug) => {
  console.log(debug);
});

server.on(Events.server.GAME_UPDATE, (game) => {
  console.log("GAME_UPDATE");
  console.log(game);
  vue.$store.commit('updateGame', game);
});

server.on(Events.server.AUTHENTICATION_STATUS, status => {
  vue.$store.commit('setServerAuthenticationStatus', status);
})

vue.$mount('#app');

export default vue;