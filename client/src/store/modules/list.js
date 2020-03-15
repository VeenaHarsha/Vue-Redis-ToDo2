import axios from 'axios'
const baseUrl='http://localhost:8000/'
const state = {
  lists: []
}

const getters = {
  getLists: (state) => state.lists
}

const actions = {
  fetchLists: async function({ commit }){
    const response = await axios.get(baseUrl + 'list/')
    commit('setLists',response.data)
  },
  addList: async function({ commit }, listName) {
    const response = await axios({
      method: 'POST',
      url: baseUrl + 'list',
      data: {
        listName: listName
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('setNewList', response.data)
  }
}

const mutations = {
  setLists: (state, lists) => (state.lists = lists),
  setNewList: (state, list) => (state.lists.unshift(list))
}

export default {
  state,
  getters,
  actions,
  mutations
}