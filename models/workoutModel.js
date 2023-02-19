const mongoose = require('mongoose');

const Schema = mongoose.Schema; // mongoose.Schema creates a schema

// schema structure
const workoutSchema = new Schema({
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true }
}, { timestamps: true});

// To export the schemas
module.exports = mongoose.model('Workout', workoutSchema);






