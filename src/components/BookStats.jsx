import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4D6D', '#AA66CC'];

const BookStats = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/books/")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  // % Completed
  const totalBooks = books.length;
  const completedBooks = books.filter(b => b.status === 'completed').length;
  const completionRate = totalBooks > 0 ? Math.round((completedBooks / totalBooks) * 100) : 0;

  // Genre count
  const genreCount = {};
  books.forEach(book => {
    const genre = book.genre || 'Unknown';
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });

  const genreData = Object.entries(genreCount).map(([genre, count]) => ({
    name: genre,
    value: count
  }));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📊 Reading Stats</h2>
      <p>Total Books: {totalBooks}</p>
      <p>Completed: {completedBooks}</p>
      <p>✅ Completion Rate: {completionRate}%</p>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Pie Chart: Genre */}
        <div style={{ width: '300px', height: '300px', marginRight: '2rem' }}>
          <h4>Books by Genre</h4>
          <PieChart width={300} height={300}>
            <Pie
              data={genreData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {genreData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Bar Chart: Genre */}
        <div style={{ width: '300px', height: '300px' }}>
          <h4>Genre Distribution</h4>
          <BarChart width={300} height={300} data={genreData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default BookStats;
