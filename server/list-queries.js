const { get, hmset, incr, rpush, lrange, lrem, hset, hexists, hget } = require('./redis.client')

const getList = async (req, res) => {
  try {
    const listIds = await lrange('listIds', 0, -1)
    if (!listIds.length) return res.status(200).json({ listCount: 0, lists: [] })
    const allLists = []
    for (const listId of listIds) {
      const list = await hget(listId, 'name')
      allLists.push({ listId: listId, name: list })
    }
    res.status(200).json({ listCount: listIds.length, lists: allLists })
  } catch (err) {
    res.status(500).json({ error: 'There was an error while connecting. Please try again later' })
  }
}
// } catch (err) {
//   res.status(500).json({ error: 'There was an error while connecting. Please try again later' })
// }
const createList = async (req, res) => {
  const { name } = req.body
  try {
    let listId = await get('listCounter')
    if (!listId) {
      listId = await incr('listCounter')
    }
    await hmset(listId, 'name', name)
    await rpush('listIds', listId)
    await incr('listCounter')
    res.status(200).json({ name: name })
  } catch (err) {
    if (!err.response) {
      // network error
      this.errorStatus = 'Error: Network Error'
    } else {
      this.errorStatus = err.response.data.message
    }
  }
}

const deleteList = async (req, res) => {
  const { id } = req.params
  try {
    const taskIds = await lrange('taskIds', 0, -1)
    for (const taskId of taskIds) {
      const lId = await hget(taskId, 'listId')
      if (lId === id) {
        await lrem('taskIds', -1, taskId)
      }
    }
    await lrem('listIds', -1, id)
    res.status(200).json({ deleted: true })
  } catch (err) {
    if (!err.response) {
      // network error
      this.errorStatus = 'Error: Network Error'
    } else {
      this.errorStatus = err.response.data.message
    }
  }
}

const updateList = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    let list = await hexists(id, 'name')
    if (!list) {
      return res.status(404).json({ error: 'List not present!' })
    }
    list = await hset(id, 'name', name)
    res.status(200).json({ listId: id, name: name })
  } catch (err) {
    if (!err.response) {
      // network error
      this.errorStatus = 'Error: Network Error'
    } else {
      this.errorStatus = err.response.data.message
    }
  }
}

module.exports = { getList, createList, updateList, deleteList }
