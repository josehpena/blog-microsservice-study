const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const { randomBytes } = require("crypto");

app.use(bodyParser.json());

const PORT = 4001;

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) =>{
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) =>{
    const commentsId = randomBytes(4).toString("hex");
    const content = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentsId, content});

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(PORT, () =>{
    console.log("Server is running on PORT " + PORT)
})