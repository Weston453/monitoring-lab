const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: 'c19321d169c04406acadb65f9924ce3d',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info('Dinner is Served!')
})

//---------------------------------------------------

// const numbers = []

// app.post('/api/number', (req, res )=>{
//     const {number} = req.body
//     numbers.push(number)

//     rollbar.log('The Number has been added!')
//     res.status(200).send(number)

// })

const port = process.env.PORT || 4040

app.use(rollbar.errorHandler())

app.listen(port, ()=> console.log(`Pikachu use Thunderbolt on port: ${port}!`))
