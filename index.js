const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = 'BDwYyNLBYIyNOBFX3M27uTAUXLrUxgHVyBJPjxJj3aQR7ghxC_MetHpzgTspdk4e4Iq9E0LCzeAtbCPOcdclxCk';
const privateVapidKey = 'rOHBJ0AGjSf37QW-mPRScGNr_0Bqn6Ouk-1nQPUUPpI';

webpush.setVapidDetails('mailto:patrykadamczyk@patrykadamczyk.net', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});
    // Create payload
    const payload = JSON.stringify({title: "Push Test", content: "Push Content"});
    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
