<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Expense Tracker</title>
	<style>
    	body {
        	font-family: Arial, sans-serif;
        	padding: 20px;
        	background-color: #f4f4f4;
    	}
    	h1 {
        	color: #333;
    	}
    	.form-group {
        	margin-bottom: 10px;
    	}
    	input, button {
        	padding: 8px;
        	margin: 5px;
        	font-size: 16px;
    	}
    	table {
        	width: 100%;
        	border-collapse: collapse;
        	margin-top: 20px;
    	}
    	table, th, td {
        	border: 1px solid #ddd;
    	}
    	th, td {
        	padding: 8px;
        	text-align: left;
    	}
	</style>
</head>
<body>
	<h1>Expense Tracker</h1>
	<div>
    	<div class="form-group">
        	<label for="description">Expense Description:</label>
        	<input type="text" id="description" placeholder="Enter description">
    	</div>
    	<div class="form-group">
        	<label for="amount">Amount:</label>
        	<input type="number" id="amount" placeholder="Enter amount">
    	</div>
    	<button id="addExpenseBtn">Add Expense</button>
	</div>

	<h2>Expenses</h2>
	<table id="expenseTable">
    	<thead>
        	<tr>
            	<th>Description</th>
            	<th>Amount</th>
        	</tr>
    	</thead>
    	<tbody></tbody>
	</table>

	<script>
    	// Function to fetch expenses from the backend and display them
    	function fetchExpenses() {
        	fetch('http://localhost:3000/expenses')
            	.then(response => response.json())
            	.then(data => {
                	const tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
                	tableBody.innerHTML = '';  // Clear the table before populating
                	data.forEach(expense => {
                    	const row = tableBody.insertRow();
                    	row.insertCell(0).textContent = expense.description;
                    	row.insertCell(1).textContent = expense.amount;
                	});
            	})
            	.catch(error => console.error('Error fetching expenses:', error));
    	}

    	// Function to add an expense
    	document.getElementById('addExpenseBtn').addEventListener('click', () => {
        	const description = document.getElementById('description').value;
        	const amount = document.getElementById('amount').value;

        	if (!description || !amount) {
            	alert('Please provide both description and amount');
            	return;
        	}

        	fetch('http://localhost:3000/expenses', {
            	method: 'POST',
            	headers: {
                	'Content-Type': 'application/json',
            	},
            	body: JSON.stringify({ description, amount })
        	})
        	.then(response => response.json())
        	.then(() => {
            	fetchExpenses();  // Refresh the list of expenses
            	document.getElementById('description').value = '';  // Clear input
            	document.getElementById('amount').value = '';  // Clear input
        	})
        	.catch(error => console.error('Error adding expense:', error));
    	});

    	// Fetch and display expenses when the page loads
    	fetchExpenses();
	</script>
</body>
</html>


