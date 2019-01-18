import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
//--> import bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import Paho from 'paho.mqtt.js'
//import 'paho.mqtt.js/src/mqttws31'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
//Vue.Paho = Vue.prototype.$Paho = Paho
Vue.use(BootstrapVue)
//Vue.use(Paho)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
