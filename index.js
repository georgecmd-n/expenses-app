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

    // Update the database schema to add new columns if they do not exist
    db.serialize(() => {
        db.run(`ALTER TABLE expenses ADD COLUMN category TEXT`, (err) => {
            if (err && !err.message.includes("duplicate column name")) {
                console.error("Error adding 'category' column:", err.message);
            }
        });

        db.run(`ALTER TABLE expenses ADD COLUMN day INTEGER`, (err) => {
            if (err && !err.message.includes("duplicate column name")) {
                console.error("Error adding 'day' column:", err.message);
            }
        });

        db.run(`ALTER TABLE expenses ADD COLUMN month INTEGER`, (err) => {
            if (err && !err.message.includes("duplicate column name")) {
                console.error("Error adding 'month' column:", err.message);
            }
        });

        db.run(`ALTER TABLE expenses ADD COLUMN year INTEGER`, (err) => {
            if (err && !err.message.includes("duplicate column name")) {
                console.error("Error adding 'year' column:", err.message);
            }
        });
    });
});

// Create the "expenses" table if it doesn't already exist
db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT,
        day INTEGER,
        month INTEGER,
        year INTEGER
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

// Route to get all expenses with optional filters
app.get('/expenses', (req, res) => {
    const { category, day, month, year } = req.query;

    let query = 'SELECT * FROM expenses WHERE 1=1';
    const params = [];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }
    if (day) {
        query += ' AND day = ?';
        params.push(day);
    }
    if (month) {
        query += ' AND month = ?';
        params.push(month);
    }
    if (year) {
        query += ' AND year = ?';
        params.push(year);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error fetching expenses:', err.message);
            return res.status(500).send('Error fetching expenses');
        }
        res.json(rows); // Send the list of expenses
    });
});

// Route to add an expense
app.post('/expenses', (req, res) => {
    const { description, amount, category, day, month, year } = req.body;

    // Ensure required fields are provided
    if (!description || !amount || !category || !day || !month || !year) {
        return res.status(400).send('All fields are required');
    }

    // Insert the new expense into the database
    const query = 'INSERT INTO expenses (description, amount, category, day, month, year) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(query, [description, amount, category, day, month, year], function (err) {
        if (err) {
            console.error('Error adding expense:', err.message);
            return res.status(500).send('Error adding expense');
        }

        // Respond with the newly added expense
        res.status(201).json({ id: this.lastID, description, amount, category, day, month, year });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
