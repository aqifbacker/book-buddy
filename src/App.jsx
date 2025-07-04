import React from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookStats from './components/BookStats';
import './App.css';

function App() {
  return (
    <div>
      <h1>📚 Book Buddy</h1>
      <BookForm />
      <BookList />
      <BookStats />
    </div>
  );
}

export default App;
