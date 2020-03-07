import Vue from 'vue';
import Vuelidate from 'vuelidate'
import App from './App.vue';
import router from './router';

import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

const bus = new Vue()
Vue.prototype.$bus = bus
Vue.use(Ionic);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
