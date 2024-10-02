const express = require('express');
const fs = require('fs');
const path = require('path'); // Import path module
const app = express();

app.use(express.json()); // For parsing application/json
app.use(express.static('public')); // Serve static files from 'public' directory
app.set('view engine', 'ejs');

// Construct the path for the scores file
const scoreFilePath = path.join(__dirname, 'data', 'score.json');

// Load and render the main game page
app.get('/', (req, res) => {
    fs.readFile(scoreFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading scores:', err);
            return res.status(500).send('Error reading scores');
        }

        let scores = [];
        try {
            // Parse the scores data
            scores = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing scores JSON:', parseErr);
            return res.status(500).send('Error parsing scores data'); // Send response on parse error
        }

        // Render the index.ejs file, passing the scores data to the template
        res.render('index', { scores });
    });
});

// Route to save high score
app.post('/save-high-score', (req, res) => {
    const { username, time } = req.body;

    // Load existing scores
    fs.readFile(scoreFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading scores:', err);
            return res.status(500).send('Error reading scores');
        }

        let scores = [];
        try {
            scores = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing scores JSON:', parseErr);
            return res.status(500).send('Error parsing scores data'); // Send response on parse error
        }

        // Add new score
        scores.push({ name: username, points: time });
        
        // Write updated scores back to the file
        fs.writeFile(scoreFilePath, JSON.stringify(scores, null, 2), (err) => {
            if (err) {
                console.error('Error writing scores:', err);
                return res.status(500).send('Error saving score');
            }
            res.status(200).send('High score saved!'); // Successful response
        });
    });
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
