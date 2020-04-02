const { get, hgetall, hget, hmset, incr, rpush, lrange, lrem, hexists } = require('./redis.client')

const getTasksForList = async (req, res) => {
  try {
    const { listid } = req.params
    const taskIds = await lrange('taskIds', 0, -1)
    if (!taskIds.length) return res.status(200).json({ taskCount: 0, tasks: [] })
    const allTasks = []
    for (const taskId of taskIds) {
      const task = await hgetall(taskId)
      if (task.listId === listid) {
        allTasks.push({ taskId: taskId, ...task })
      }
    }
    res.status(200).json({ taskCount: taskIds.length, tasks: allTasks })
  } catch (err) {
    res.status(500).json({ error: 'Error while Connecting!' })
  }
}
const getAllTasks = async (req, res) => {
  try {
    const taskIds = await lrange('taskIds', 0, -1)
    if (!taskIds.length) return res.status(200).json({ taskCount: 0, tasks: [] })
    const allTasks = []
    for (const taskId of taskIds) {
      const task = await hgetall(taskId)
      allTasks.push({ taskId: taskId, ...task })
    }
    res.status(200).json({ taskCount: taskIds.length, tasks: allTasks })
  } catch (err) {
    res.status(500).json({ error: 'Error while Connecting!' })
  }
}

const getTodayTasks = async (req, res) => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  const currDate = yyyy + '-' + mm + '-' + dd
  try {
    const taskIds = await lrange('taskIds', 0, -1)
    if (!taskIds.length) return res.status(200).json({ taskCount: 0, schTasks: [] })
    const allSchTasks = []
    for (const taskId of taskIds) {
      const task = await hgetall(taskId)
      const listId = task.listId // await hget(taskId, 'listId')
      const listName = await hget(listId, 'name')
      if (task.dueDate === currDate) {
        allSchTasks.push({ taskId: taskId, listName: listName, name: task.name, completed: task.completed, dueDate: task.dueDate })
      }
    }
    res.status(200).json({ taskCount: taskIds.length, schTasks: allSchTasks })
  } catch (err) {
    res.status(500).json({ error: 'Error while Connecting!' })
  }
}
const getSchTasks = async (req, res) => {
  try {
    const taskIds = await lrange('taskIds', 0, -1)
    if (!taskIds.length) return res.status(200).json({ taskCount: 0, schTasks: [] })
    const allSchTasks = []
    for (const taskId of taskIds) {
      const task = await hgetall(taskId)
      const listId = task.listId
      const listName = await hget(listId, 'name')
      if (task.dueDate) {
        allSchTasks.push({ taskId: taskId, listName: listName, name: task.name, completed: task.completed, dueDate: task.dueDate })
      }
    }
    res.status(200).json({ taskCount: taskIds.length, schTasks: allSchTasks })
  } catch (err) {
    res.status(500).json({ error: 'Error while Connecting!' })
  }
}
const createTask = async (req, res) => {
  const { name, listId, notes, priority, dueDate, completed } = req.body
  try {
    const taskId = await get('taskCounter')
    await hmset(taskId, 'name', name, 'listId', listId, 'notes', notes, 'priority', priority, 'dueDate', dueDate, 'completed', completed)
    await rpush('taskIds', taskId)
    await incr('taskCounter')
    res.status(200).json({ taskId: taskId, name: name, listId: listId, notes: notes, priority: priority, dueDate: dueDate, completed: completed })
  } catch (err) {
    res.status(500).json({ error: 'Error while Connecting!' })
  }
}
const updateTask = async (req, res) => {
  const { taskId, name, notes, priority, dueDate, completed } = req.body
  try {
    const task = await hexists(taskId, 'name')
    if (!task) {
      return res.status(404).json({ error: 'Task not present!' })
    }
    await hmset(taskId, 'name', name, 'notes', notes, 'priority', priority, 'dueDate', dueDate, 'completed', completed)
    res.status(200).json({ taskId, name: name, notes: notes, priority: priority, dueDate: dueDate, completed: completed })
  } catch (err) {
    res.status(500).json({ error: 'Error while Connecting!' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    await lrem('taskIds', -1, id)
    res.status(200).json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: 'Error while Connecting!' })
  }
}
module.exports = {
  createTask,
  getTasksForList,
  updateTask,
  deleteTask,
  getAllTasks,
  getTodayTasks,
  getSchTasks
}
