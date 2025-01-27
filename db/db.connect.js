const mongoose = require('mongoose')
require("dotenv").config()
const mongoUri = process.env.MONGODB

const initailizeDatabase = async () => {
   await mongoose
   .connect(mongoUri)
   .then(()=>
    {
     console.log('Connected to MongoDB')
    })
    .catch((error) => 
        console.log("Error connecting to Database",error))
}

module.exports = {initailizeDatabase}



