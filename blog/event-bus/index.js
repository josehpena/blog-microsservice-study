const express = require("express");

const bodyParser = require("body-parser");

const axios = require("axios");

const app = express();

const PORT = 4005;

const events = [];

app.use(bodyParser.json());

app.post('/events', (req, res) => {

    const event = req.body;

    events.push(event);

    axios.post("http://localhost:4000/events", event).catch((err) => {
        console.log(err.message);
    });

    axios.post("http://localhost:4001/events", event).catch((err) => {
        console.log(err.message);
    });
    
    axios.post("http://localhost:4002/events", event).catch((err) => {
        console.log(err.message);
    });

    axios.post('http://localhost:4003/events', event).catch((err) =>{
        console.log(err.message);
    })

    res.send({ status: 'OK' })

});

app.get('/events', (require, response) => {
    response.send(events);
})

app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
});

