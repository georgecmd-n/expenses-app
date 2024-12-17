const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./expenses.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});

// Create the "expenses" table if it doesn't already exist
db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    }
});

// Serve the frontend HTML page from 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get all expenses
app.get('/expenses', (req, res) => {
    db.all('SELECT * FROM expenses', [], (err, rows) => {
        if (err) {
            console.error('Error fetching expenses:', err.message);
            return res.status(500).send('Error fetching expenses');
        }
        res.json(rows); // Send the list of expenses
    });
});

// Route to add an expense
app.post('/expenses', (req, res) => {
    const { description, amount } = req.body;

    // Ensure description and amount are provided
    if (!description || !amount) {
        return res.status(400).send('Description and amount are required');
    }

    // Insert the new expense into the database
    const query = 'INSERT INTO expenses (description, amount) VALUES (?, ?)';
    db.run(query, [description, amount], function (err) {
        if (err) {
            console.error('Error adding expense:', err.message);
            return res.status(500).send('Error adding expense');
        }

        // Respond with the newly added expense
        res.status(201).json({ id: this.lastID, description, amount });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
