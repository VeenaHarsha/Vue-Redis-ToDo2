const baseUrl = 'http://localhost:4000/'

const state = {
  tasks: [],
  schTasks: []
}

const getters = {
  getTaskItems: state => state.tasks,
  moreInfo: state => state.moreInfo,
  getScheduledTasks: state => state.schTasks
}

const mutations = {
  addTaskItem: (state, data) => state.tasks.push(data),
  setTasks: (state, data) => (state.tasks = data.tasks),
  deleteTask: (state, data) => (state.tasks = state.tasks.filter(task => task.taskId !== data)),
  taskMoreInfo: (state, data) => state.tasks.push(data),
  setScheduledTasks: (state, data) => (state.schTasks = data.schTasks)
}

const actions = {
  createTask: async ({ commit }, payLoad) => {
    const { name, listId, notes, priority, dueDate, completed } = payLoad
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ name: name, listId: listId, notes: notes, priority: priority, dueDate: dueDate, completed: completed })
    }
    const response = await window.fetch(baseUrl + 'task', options)
    const data = await response.json()
    commit('addTaskItem', data)
  },
  getTasksForSelList: async ({ commit }, payLoad) => {
    if (payLoad) {
      const response = await window.fetch(baseUrl + 'tasks/' + payLoad)
      const data = await response.json()
      commit('setTasks', data)
    }
  },
  deleteTaskItem: async ({ commit }, payLoad) => {
    const options = {
      method: 'DELETE'
    }
    const response = await window.fetch(baseUrl + 'tasks/' + payLoad, options)
    const data = await response.text()
    commit('deleteTask', data)
  },
  submitTaskMoreInfo: async ({ commit }, payLoad) => {
    const { taskId, name, notes, priority, dueDate, completed } = payLoad
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ taskId: taskId, name: name, notes: notes, priority: priority, dueDate: dueDate, completed: completed })
    }
    const response = await window.fetch(baseUrl + 'tasks/' + taskId, options)
    const data = await response.json()
    commit('taskMoreInfo', data)
  },
  getAllTasks: async ({ commit }) => {
    const response = await window.fetch(baseUrl + 'tasks/')
    const data = await response.json()
    console.log('From task.js:', data.tasks)
    commit('setTasks', data)
  },
  getTodayTasks: async ({ commit }) => {
    console.log('Am Inside getTodayTasks')
    const response = await window.fetch(baseUrl + 'today/tasks')
    const data = await response.json()
    console.log('From Task.js, Todays Tasks:', data.schTasks)
    commit('setScheduledTasks', data)
  },
  getSchTasks: async ({ commit }) => {
    const response = await window.fetch(baseUrl + 'sch/tasks')
    const data = await response.json()
    commit('setScheduledTasks', data)
  }
}

export default { state, getters, mutations, actions }
