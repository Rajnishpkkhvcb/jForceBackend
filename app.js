const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;
// Allow requests from all origins
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hashMedia',
    password: 'postgres',
  port: 5432,
});

// Routes
// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { description, completed } = req.body;
  try {
    const { rows } = await pool.query('UPDATE tasks SET description = $1, completed = $2 WHERE id = $3 RETURNING *', [description, completed, taskId]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.status(204).send();
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
