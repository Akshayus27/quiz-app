const express = require('express')
const route = require('./routes/routes')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', route)

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Quiz', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false} , (err) => {
    if(!err) console.log('Connected to the database...')
    else{
        console.log(err)
    }
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})
