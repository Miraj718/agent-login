// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = ({ onClientSelect }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        // Fetch client data from the API
        axios.get('http://localhost:3000/visitors') // Replace URL with your API endpoint
            .then(response => {
                console.log('Fetched clients:', response.data); // Log fetched clients
                setClients(response.data);
            })
            .catch(error => console.error('Error fetching clients:', error));
    }, []); // Empty dependency array to run the effect only once

    const handleClientClick = (client) => {
        setSelectedClient(client);
        onClientSelect(client); // Notify parent component about the selected client
    };

    return (
        <div className="admin-dashboard">
            <div className="client-list">
                <h2>Clients</h2>
                <ul>
                    {clients.length > 0 ? (
                        clients.map(client => (
                            <li key={client.id} onClick={() => handleClientClick(client)}>
                                {client.name}
                            </li>
                        ))
                    ) : (
                        <li>No clients available</li>
                    )}
                </ul>
            </div>
            <div className="client-messages">
                {selectedClient ? (
                    <div className="selected-client-messages">
                        <div className="client-info">
                            <h3>{selectedClient.name}</h3>
                            <p>Email: {selectedClient.email}</p>
                            <p>Phone: {selectedClient.phone}</p>
                        </div>
                        <div className="messages">
                            {selectedClient.messages && selectedClient.messages.length > 0 ? (
                                selectedClient.messages.map(message => (
                                    <div
                                        key={message.id}
                                        className={`message client-message`}
                                    >
                                        <p>{message.message}</p>
                                        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No messages available for this client</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="no-client-selected">No client selected</div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
