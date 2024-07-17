import React, { useState } from 'react';
import axios from 'axios';
import AgentChat from './AgentChat'; // Assuming AgentChat component is in a separate file

const AGENT_ENDPOINT = 'http://localhost:3007/agents'; // Your JSON server endpoint

const AgentForm = () => {
  const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to store the form data
      await axios.post(AGENT_ENDPOINT, userDetails);
      // Show the chat component
      setShowChat(true);
    } catch (error) {
      console.error('Error saving agent details:', error);
    }
  };

  return (
    <div>
      {!showChat ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <AgentChat userDetails={userDetails} />
      )}
    </div>
  );
};

export default AgentForm;
