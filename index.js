const express = require('express')
const app = express()
const {connectToDB} = require('./config/db.js')

connectToDB('mongodb://localhost:27017/url-shortener')

app.set('view engine','ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())


const PORT = 3000

const urlRoutes = require('./routes/url.routes.js')

app.use('/url',urlRoutes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})