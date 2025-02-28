// src/App.js
import React from 'react';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';

const App = () => {
    return (
        <div>
            <h1>Event Service</h1>
            <CreateEvent />
            <EventList />
        </div>
    );
};

export default App;
