import Vue from 'vue'
import Vuex from 'vuex'

import i18n from './modules/i18n'
import Main from './modules/Main'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        i18n,
        Main,
    }
});
