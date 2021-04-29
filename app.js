const express = require('express')
const route = require('./routes/routes')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', route)

const PORT = process.env.PORT || 4000

const uri = "mongodb+srv://<uername>:<password>@quiz-mern-stack.jfjpp.mongodb.net/quiz?retryWrites=true&w=majority"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false} , (err) => {
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
