// D:\SEM6\DevOPS\Ass_1\S4067-Assgt-EventBooking-i221053-Huzaifa-Nasir\UserService\user-service-client\src/components/FormContainer.js

import React, { useState } from 'react';
import Register from './Register';  // Import Register component
import Login from './Login';  // Import Login component
import styled from 'styled-components';

const FormContainer = () => {
    const [showRegister, setShowRegister] = useState(true);  // Toggle between Register and Login
    const formRef = React.useRef();

    const toggleForm = () => {
        setShowRegister((prev) => !prev);  // Toggle between forms
    };

    return (
        <Container>
            <Title>Welcome to User Service</Title>
            <Button onClick={toggleForm}>{showRegister ? 'Go to Login' : 'Go to Register'}</Button>

            <FormWrapper ref={formRef}>
                <FormTransition show={showRegister}>
                    <Register />
                </FormTransition>

                <FormTransition show={!showRegister}>
                    <Login />
                </FormTransition>
            </FormWrapper>
        </Container>
    );
};

// A simple transition effect using the `show` state.
const FormTransition = ({ show, children }) => {
    return (
        <Form className={show ? 'show' : 'hide'}>
            {children}
        </Form>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #f0f0f0;
`;

const Title = styled.h1`
    font-size: 3rem;
    color: #333;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #45a049;
    }
    margin-bottom: 20px;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;
    position: relative;
    height: 300px;
    transition: all 0.5s ease;
`;

const Form = styled.div`
    transition: opacity 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    &.show {
        opacity: 1;
    }
    &.hide {
        opacity: 0;
    }
`;

export default FormContainer;
