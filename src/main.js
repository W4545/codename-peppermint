import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

let vue = new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');

export default vue;