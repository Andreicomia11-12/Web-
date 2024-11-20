require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout')
const cors = require('cors');

//express app
const app = express();


//middleware
app.use(express.json())
app.use(cors());

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workout',workoutRoutes)

//connect to db 
mongoose.connect(process.env.MONG_URI)
    .then(() => {
    //listen to a port number
    app.listen(process.env.PORT, () =>{
        console.log('Connected to Database & Listening to Port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



