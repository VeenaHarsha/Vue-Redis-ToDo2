const redis = require('redis')
const client = redis.createClient()

const { promisify } = require('util')

client.on('connect', () => {
  console.log('Redis Ready!!!')
})

client.on('error', err => {
  console.log(err)
})

const get = promisify(client.get).bind(client)
const hmget = promisify(client.hmget).bind(client)
// const set = promisify(client.set).bind(client)
const hmset = promisify(client.hmset).bind(client)
const incr = promisify(client.incr).bind(client)
const rpush = promisify(client.rpush).bind(client)
const lrange = promisify(client.lrange).bind(client)
const lrem = promisify(client.lrem).bind(client)
const hset = promisify(client.hset).bind(client)
const hexists = promisify(client.hexists).bind(client)
const hget = promisify(client.hget).bind(client)
const hgetall = promisify(client.hgetall).bind(client)
module.exports = { get, hmset, incr, rpush, lrange, lrem, hset, hexists, hget, hmget, hgetall }
