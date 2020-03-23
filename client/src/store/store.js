import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/list'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list,
    task
  }
})
