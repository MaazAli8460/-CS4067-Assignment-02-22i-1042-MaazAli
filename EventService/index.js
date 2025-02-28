// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // to parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB for Event Service');
})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

// Import Event model
const Event = require('./models/Event');

// Route to fetch all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find(); // Get all events from the database
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

// Route to add a new event
app.post('/events', async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
        const newEvent = new Event({ title, description, date, location });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
});

// Start the server
app.listen(5001, () => {
    console.log('Event Service is running on port 5001');
});
