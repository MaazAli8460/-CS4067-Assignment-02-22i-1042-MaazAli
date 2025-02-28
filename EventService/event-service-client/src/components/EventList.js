// src/components/EventList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from the Event Service API
        axios.get('http://localhost:5001/events')
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    }, []);

    return (
        <Container>
            <Title>Event Listings</Title>
            <EventWrapper>
                {events.length === 0 ? (
                    <Message>No events available.</Message>
                ) : (
                    events.map((event) => (
                        <EventCard key={event._id}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>{new Date(event.date).toLocaleString()}</p>
                            <p>{event.location}</p>
                        </EventCard>
                    ))
                )}
            </EventWrapper>
        </Container>
    );
};

const Container = styled.div`
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: #f4f4f9;
`;

const Title = styled.h2`
    color: #333;
    margin-bottom: 20px;
`;

const EventWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const EventCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
    }

    h3 {
        color: #4CAF50;
    }

    p {
        color: #555;
    }
`;

const Message = styled.p`
    color: #888;
`;

export default EventList;
