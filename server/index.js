const express = require('express')

const dotenv = require('dotenv')
dotenv.config()

const port = 4000
const app = express()
const cors = require('cors')

const liDb = require('./list-queries')
const tskDb = require('./task-queries')

app.use(cors())
app.use(express.json())

app.get('/list', liDb.getList)
app.post('/list', liDb.createList)
app.put('/list/:id', liDb.updateList)
app.delete('/list/:id', liDb.deleteList)

app.get('/tasks', tskDb.getAllTasks)
app.post('/task', tskDb.createTask)
app.get('/tasks/:listid', tskDb.getTasksForList)
app.put('/tasks/:id', tskDb.updateTask)
app.delete('/tasks/:id', tskDb.deleteTask)

app.get('/today/tasks', tskDb.getTodayTasks)
app.get('/sch/tasks', tskDb.getSchTasks)

app.listen(port, () => console.log(`Server running on Port ${port}`))
