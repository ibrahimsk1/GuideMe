import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import tr from './locales/tr.json'
import { defaultLocale, localeOptions } from './constans/config'
import CustomDirectives from "./directives/index"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueI18n);
const messages = { en: en, tr: tr };
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'tr',
  messages
});

export default new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
