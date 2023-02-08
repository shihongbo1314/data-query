import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import 'leaflet/dist/leaflet.css';


import './icons'
import SvgIcon from '@/icons/SvgIcon'
Vue.component('svg-icon', SvgIcon)
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
