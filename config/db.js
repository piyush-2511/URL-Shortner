const mongoose = require('mongoose')

function connectToDB(URI){
  mongoose.connect(URI).then(()=>{
    console.log('Connected to DB')
  })
}

module.exports = {connectToDB}

