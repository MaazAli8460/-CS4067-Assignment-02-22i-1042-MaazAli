import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import FormContainer from './components/FormContainer';
import './App.css';
import './EventsPage.css'; // Ensure this import is correct

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    console.log('Location state:', state); // Debug log
    if (state && state.events) {
      setEvents(state.events);
    } else {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('http://localhost:5001/events');
          console.log('Fetched events:', response.data); // Debug log
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      fetchEvents();
    }
  }, [location]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Event Booking Platform</h1>
      </header>
      <main className="events-container">
        <h2>Event Listings</h2>
        {events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card" style={{ border: '1px solid red' }}> {/* Debug border */}
                <h3>{event.title}</h3>
                <p className="event-date">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="event-tickets">
                  Available Tickets: {event.availableTickets}
                </p>
                <button className="book-button">Book Now</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-events">No events available.</p>
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormContainer />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
};

export default App;