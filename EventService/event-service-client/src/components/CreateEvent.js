// src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = { title, description, date, location };

        try {
            const response = await axios.post('http://localhost:5001/events', newEvent);
            setMessage(response.data.message);
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
        } catch (error) {
            setMessage('Error creating event');
            console.error('Error creating event:', error);
        }
    };

    return (
        <Container>
            <Title>Create New Event</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Event Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <Button type="submit">Create Event</Button>
            </Form>
            {message && <Message>{message}</Message>}
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    &:focus {
        border-color: #4CAF50;
    }
`;

const Textarea = styled.textarea`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    resize: vertical;
    min-height: 100px;
    &:focus {
        border-color: #4CAF50;
    }
`;

const Button = styled.button`
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #45a049;
    }
`;

const Message = styled.p`
    color: #888;
    font-size: 1rem;
    margin-top: 20px;
`;

export default CreateEvent;
