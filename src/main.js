import Vue from 'vue'
import App from './App.vue'
import DialogBtn from "./components/DialogBtn"

Vue.config.productionTip = false
Vue.component('dialog-btn', DialogBtn)
new Vue({
  render: h => h(App),
}).$mount('#app')
