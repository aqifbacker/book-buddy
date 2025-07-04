import React, { useState } from 'react';
import axios from 'axios';
import './BookForm.css';

const BookForm = ({ onBookAdded }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    status: 'reading',
    pages_read: 0,
    total_pages: 0,
    rating: '',
    notes: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/books/", form)
      .then(() => {
        setForm({
          title: '',
          author: '',
          genre: '',
          status: 'reading',
          pages_read: 0,
          
          rating: '',
          notes: ''
        });
        onBookAdded();
      })
      .catch(err => console.error(err));
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Add a Book</h2>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Book Title" required />
      <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input type="text" name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
        <option value="wishlist">Wishlist</option>
      </select>
      <input type="number" name="pages_read" value={form.pages_read} onChange={handleChange} placeholder="Pages Read" />
      <input type="number" name="total_pages" value={form.total_pages} onChange={handleChange} placeholder="Total Pages" />
      <input type="number" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating (1-5)" />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes"></textarea>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
