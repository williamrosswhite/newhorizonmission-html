console.log("and then a miracle happened...")

const express = require('express')
const app = express()

app.use(express.urlencoded())

app.post('/submit-form', (req, res) => {
    const username = req.body.username
    //...
    res.end()
  })