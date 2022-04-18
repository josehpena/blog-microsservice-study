const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const PORT = 4000

const posts = {};

app.get("/posts", (req, res) =>{
    res.send(posts);
});

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    

    await axios.post("http://localhost:4005/events", {
        type: "PostCreated",
        data: {
        id, title
        }
    });

    posts[id] = {
        id,
        title
    };

    res.status(201).send(posts[id]);
    
});

app.listen(4000, () => {
    console.log("Server is running on PORT " + PORT);
});