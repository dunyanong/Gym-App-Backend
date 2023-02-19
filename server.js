require('dotenv').config()

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express()

// declaration of mongoose
const mongoose = require('mongoose');

// middleware to parse the requests into return object
app.use(express.json())

// routes
app.use('/api/workouts', workoutRoutes)

//
app.use('/api/user', userRoutes)

// connect to Mongo database
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    }) 
  } catch(err) {
    console.log(err);
  }
} 

connectDB();

