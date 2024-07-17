import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard component
import './AgentChat.css';

const ENDPOINT = 'http://localhost:3000/visitors';
const AGENT_MESSAGE_ENDPOINT = 'http://localhost:3007/message';

const AgentChat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [clients, setClients] = useState([]); // State to track clients
    const [currentClient, setCurrentClient] = useState(null); // State to track the current client

    useEffect(() => {
        const intervalId = setInterval(fetchMessages, 3000); // Poll every 3 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(ENDPOINT);
            setMessages(response.data);
            const newClients = response.data.map(msg => msg.user).filter(user => user !== 'Agent');
            setClients(prevClients => {
                const addedClients = newClients.filter(client => !prevClients.includes(client));
                if (addedClients.length > 0) {
                    setCurrentClient(addedClients[0]); // Set the first new client as the current client
                    alert(`New client joined: ${addedClients[0]}`); // You can customize this alert as needed
                }
                return [...new Set([...prevClients, ...newClients])]; // Merge and deduplicate clients
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                user: 'Agent',
                message,
                timestamp: new Date().toISOString(),
            };
            try {
                // Send message to the visitors endpoint to be displayed
                await axios.post(ENDPOINT, newMessage);

                // Store agent's message in the agent messages endpoint
                await axios.post(AGENT_MESSAGE_ENDPOINT, newMessage);

                setMessages([...messages, newMessage]);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <AdminDashboard /> {/* Render AdminDashboard component */}
            <div className='agent-chat-container'>
                <div className="chat-header">
                    <h1>Agent Chat with {currentClient}</h1>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.user === 'Agent' ? 'agent' : 'client'}`}>
                            <div className="content">
                                <div className="user">{msg.user}</div>
                                <div>{msg.message}</div>
                                <div className="time">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default AgentChat;
