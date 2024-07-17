// DetailForm.js
import React, { useState } from 'react';
import './detailform.css';

const DetailForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateForm = () => {
    let valid = true;

    // Validate name: less than 20 characters and only letters
    if (name.length > 20 || !/^[a-zA-Z]+$/.test(name)) {
      setNameError("Name must be less than 20 characters and only contain letters.");
      valid = false;
    } else {
      setNameError("");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate phone number: exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number must be exactly 10 digits.");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const formData = {
        name: name,
        email: email,
        phone: phone,
        messages: [
          {
            id: '_' + Math.random().toString(36).substr(2, 9),
            user: 'Client',
            message: 'Chat started',
            timestamp: new Date().toISOString(),
          }
        ]
      };
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {nameError && <div className="error">{nameError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter Your Phone Number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          {phoneError && <div className="error">{phoneError}</div>}
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DetailForm;
