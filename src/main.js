import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/analytics'

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

vue.$mount('#app');

export default vue;