const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

const result = dotenv.config({ encoding: 'utf8', debug: true })
if(result.error) throw result.error

const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 3001

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('*', async(req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(SERVER_PORT, async() => {
    console.log(`Runing in ${SERVER_PORT} port`)
})