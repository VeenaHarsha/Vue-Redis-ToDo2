const redis = require('redis')
const client = redis.createClient()

const { promisify } = require('util')

const get = promisify(client.get).bind(client)
const hmset = promisify(client.hmset).bind(client)
const incr = promisify(client.incr).bind(client)
const rpush = promisify(client.rpush).bind(client)
const lrange = promisify(client.lrange).bind(client)
const lrem = promisify(client.lrem).bind(client)
const hset = promisify(client.hset).bind(client)
const hexists = promisify(client.hexists).bind(client)
const hget = promisify(client.hget).bind(client)

client.on('connect', () => {
  console.log('Redis Ready!!!')
})

client.on('error', err => {
  console.log(err)
})

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

const createList = async (req, res) => {
  const { name } = req.body
  try {
    const listId = await get('listCount')
    await hmset(listId, 'name', name)
    await rpush('listIds', listId)
    await incr('listCount')
    res.status(200).json({ name: name })
  } catch (err) {
    res.status(500).json({ error: 'There was an error nnnn while connecting. Please try again later' })
  }
}

const deleteList = async (req, res) => {
  try {
    const { id } = req.params
    await lrem('listIds', -1, id)
    res.status(200).json({ deleted: true })
  } catch (err) {
    res.status(500).json({ err: 'Error!!' })
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
    res.status(500).json({ err: 'Error!!' })
  }
}

module.exports = { getList, createList, updateList, deleteList }
