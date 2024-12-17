const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store expenses
const expenses = [];

// Serve the frontend HTML page from 'public'
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

// Route to get all expenses
app.get('/expenses', (req, res) => {
	res.json(expenses); // Send the list of expenses
});

// Route to add an expense
app.post('/expenses', (req, res) => {
	const { description, amount } = req.body;

	// Ensure description and amount are provided
	if (!description || !amount) {
    	return res.status(400).send('Description and amount are required');
	}

	// Create a new expense object
	const expense = { description, amount, id: expenses.length + 1 };
	expenses.push(expense);  // Add the expense to the array

	// Respond with the new expense
	res.status(201).json(expense);
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
