const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    
    fs.readFile('./data/score.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading scores:', err);
            return res.status(500).send('Error reading scores');
        }

        let scores = [];
        try {
            scores = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing scores JSON:', parseErr);
        }

        res.render('index', { scores });
    });
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
