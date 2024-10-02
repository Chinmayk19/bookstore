import React, { useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [userDetails, setUserDetails] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
  const [books, setBooks] = useState([{ sno: 1, title: '', author: '', genre: '', year: '', isbn: '' }]); // Initialize with one empty row
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  // Validation helper
  const validateInputs = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', email: '' };

    if (!userDetails.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!/^\d{10}$/.test(userDetails.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle user input change
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle book input change
  const handleBookChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBooks = [...books];
    updatedBooks[index] = { ...updatedBooks[index], [name]: value };
    setBooks(updatedBooks);
  };

  // Add new row with empty fields for book
  const addBook = () => {
    setBooks([...books, { sno: books.length + 1, title: '', author: '', genre: '', year: '', isbn: '' }]);
    setEditingRowIndex(books.length); 
  };

  // Delete a book row
  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  // Make row editable
  const editBook = (index) => {
    setEditingRowIndex(index); 
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const dataToSubmit = {
      userDetails,
      books,
    };

    try {
      const response = await axios.post('http://localhost:3001/userbooks', dataToSubmit);
      console.log("Response from server: ", response.data);
      alert("success");
      setUserDetails({ name: '', phone: '', email: '' });
      setBooks([{ sno: 1, title: '', author: '', genre: '', year: '', isbn: '' }]);
      setEditingRowIndex(null); 

    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("failure");
    }
  };

  return (
<div className="home-container">
  <h2>DONATE A BOOK</h2>
  <div className="user-details">
        <label htmlFor="name">Name:</label>
        <input name="name" id="name" value={userDetails.name} onChange={handleUserChange} placeholder="Name" autoComplete="off" />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="phone">Phone No:</label>
        <input name="phone" id="phone" value={userDetails.phone} onChange={handleUserChange} placeholder="Phone" autoComplete="off" />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label htmlFor="email">Email:</label>
        <input name="email" id="email" value={userDetails.email} onChange={handleUserChange} placeholder="Email" autoComplete="off" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

  <button className="add-book-btn" onClick={addBook}>+</button>

  <div className="table-container"> 
    <table>
      <thead>
        <tr>
          <th>Sno</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Year of Publication</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={index}>
            <td>{book.sno}</td>
            <td>
              <input
                name="title"
                value={book.title}
                onChange={(e) => handleBookChange(index, e)}
                disabled={editingRowIndex !== index && index !== books.length - 1}
                autoComplete="off"
              />
            </td>
            <td>
              <input
                name="author"
                value={book.author}
                onChange={(e) => handleBookChange(index, e)}
                disabled={editingRowIndex !== index && index !== books.length - 1}
                autoComplete="off"
              />
            </td>
            <td>
              <input
                name="genre"
                value={book.genre}
                onChange={(e) => handleBookChange(index, e)}
                disabled={editingRowIndex !== index && index !== books.length - 1}
                autoComplete="off"
              />
            </td>
            <td>
              <input
                name="year"
                value={book.year}
                onChange={(e) => handleBookChange(index, e)}
                disabled={editingRowIndex !== index && index !== books.length - 1}
                autoComplete="off"
              />
            </td>
            <td>
              <input
                name="isbn"
                value={book.isbn}
                onChange={(e) => handleBookChange(index, e)}
                disabled={editingRowIndex !== index && index !== books.length - 1}
                autoComplete="off"
              />
            </td>
            <td>
              {index !== books.length - 1 && (
                <>
                  <button onClick={() => editBook(index)}><FaEdit /></button>
                  <button onClick={() => deleteBook(index)}>-</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <button className="submit-btn" onClick={handleSubmit}>Submit</button>
</div>

  );
};

export default Home;
