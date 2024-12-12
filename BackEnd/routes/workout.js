const express = require('express')
const Workout = require('../models/workout-model')
const router = express.Router()
const {
    getWorkouts,
    singleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controllers/workout-controller')


//GET All Workouts
router.get('/', getWorkouts)

//Get a single 
router.get('/:id', singleWorkout)

//Post a new Workout
router.post('/new', createWorkout)

//localhost:5000/api/workout/:id
router.delete('/:id', deleteWorkout)

//localhost:5000/api/workout/:id
router.patch('/:id', updateWorkout)

module.exports= router