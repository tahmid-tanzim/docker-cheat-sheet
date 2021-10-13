const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const datetime = new Date().toUTCString();
    res.json({"message": "Hello World! Tanzim.", datetime});
});

app.listen(8080, () => {
    console.log("Listening on Port - 8080");
});