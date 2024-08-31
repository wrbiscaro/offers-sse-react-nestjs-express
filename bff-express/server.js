const express = require('express');
var cors = require('cors');
const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());

let offers = []; // This will hold offers

// Endpoint to add a new offer
app.post('/offers', (req, res) => {
    const newOffer = req.body;
    offers.push(newOffer);
    
    // Notify all connected clients of the new offer
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(offers)}\n\n`));
    
    res.status(200).json(offers);
});

app.get('/offers', (req, res) => {
    res.status(200).json(offers);
});

let clients = [];

// SSE endpoint
app.get('/offers/events', (req, res) => {
    // The server-side script that sends events needs to respond using the MIME type text/event-stream. 
    // Each notification is sent as a block of text terminated by a pair of newlines. 
    // For details on the format of the event stream, see Event stream format.
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    res.write(`data: ${JSON.stringify(offers)}\n\n`);

    // Save the response object to send updates to the client later
    clients.push({ res });

    // Remove client on connection close
    // By default, if the connection between the client and server closes, the connection is restarted.
    req.on('close', () => {
        clients = clients.filter(client => client.res !== res);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
