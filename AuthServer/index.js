const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Secret key for JWT (Keep this secure in a real application!)
const secretKey = 'your_secret_key';

// Simulated user database (Replace with actual database connection)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Middleware to parse JSON requests
app.use(express.json());

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the database
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Generate JWT token
        const token = jwt.sign({ username: user.username }, secretKey);

        // Return token in response
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});