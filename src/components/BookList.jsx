import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css';

const BookList = ({ refresh }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/books/")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const deleteBook = id => {
    axios.delete(`http://localhost:8000/api/books/${id}/`)
      .then(() => setBooks(prev => prev.filter(book => book.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Your Book List</h2>
      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <div className="book-grid">
          {books.map(book => (
            <div className="book-card" key={book.id}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Status:</strong> <span className={`status ${book.status}`}>{book.status}</span></p>
              {book.total_pages > 0 && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(book.pages_read / book.total_pages) * 100}%` }}
                  />
                </div>
              )}
              {book.rating && <p><strong>⭐ Rating:</strong> {book.rating}/5</p>}
              {book.notes && <p><strong>📝 Notes:</strong> {book.notes}</p>}
              <button className="delete-btn" onClick={() => deleteBook(book.id)}>🗑 Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
