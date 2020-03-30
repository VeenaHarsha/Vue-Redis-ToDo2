const baseUrl = 'http://localhost:4000/'
const state = {
  vheader: 'VeenaS To Do',
  lists: [],
  showList: true,
  showTask: false,
  selectedList: ''
}

const getters = {
  getVheader: state => state.vheader + ' App',
  getLists: state => state.lists,
  showList: state => state.showList,
  showTask: state => state.showTask,
  getSelectedList: state => state.selectedList
}

const mutations = {
  addListItem: (state, data) => {
    state.lists.push(data.name)
  },
  deleteListItem: (state, data) => {
    state.lists = state.lists.filter(list => list.id !== data)
  },
  updateListItem: (state, data) => {
    state.lists[data.listId] = data.name
  },
  toggleShowList: (state, data) => (state.showList = data),
  toggleShowTask: (state, data) => (state.showTask = data),
  setSelectedList: (state, data) => (state.selectedList = data),
  setLists: (state, data) => (state.lists = data.lists)
}

const actions = {
  addList: async function ({ commit }, payLoad) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ name: payLoad })
    }
    const response = await window.fetch(baseUrl + 'list', options)
    const data = await response.json()
    commit('addListItem', data)
  },
  getListItems: async function ({ commit }) {
    const response = await window.fetch(baseUrl + 'list')
    const data = await response.json()
    commit('setLists', data)
  },
  deleteList: async function ({ commit }, payLoad) {
    const options = {
      method: 'DELETE'
    }
    const response = await window.fetch(baseUrl + 'list/' + payLoad, options)
    const data = await response.text()
    commit('deleteListItem', data)
  },
  updateList: async function ({ commit }, payLoad) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: payLoad.name })
    }
    const response = await window.fetch(baseUrl + 'list/' + payLoad.id, options)
    const result = await response.text()
    commit('updateListItem', result)
  }

}

export default { state, getters, mutations, actions }
