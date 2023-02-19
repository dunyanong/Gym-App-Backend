const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
    // createdAt: -1 => descending order (newest one on the top)
    const workouts = await Workout.find({}).sort({createdAt: -1}); // empty {} meaning all of the documents are retrieved
    res.status(200).json(workouts);
};

// GET a single workout
const getWorkout = async (req, res) => {
    const id   = req.params.id; 

    // to check if it is a valid id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findById(id);  // Schema.method always returns a promise
  
    if (!workout) {
      return res.status(404).json({error: 'No such workout'});
    }
  
    res.status(200).json(workout)

};

// POST a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if(!title) {
      emptyFields.push('title');
    };

    if(!reps) {
      emptyFields.push('reps');
    };

    if(!load) {
      emptyFields.push('load');
    };

    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the field', emptyFields });
    }

    try {
      const workout = await Workout.create({title, reps, load}); // this returns a promise
      res.status(200).json(workout);
    } catch(err) {
      res.status(400).json({error: err.message});
    }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const id  = req.params.id; 

    // to check if it is a valid id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndDelete({_id: id});  // Schema.method always returns a promise    


    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
      }
    
    res.status(200).json(workout)    
};

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const id  = req.params.id; 
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }
  

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}