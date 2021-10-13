const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
    host: "redis-server",
    port: 6379
});
client.set("visit_count", 0);

app.get("/", (req, res) => {
    const datetime = new Date().toUTCString();
    client.get("visit_count", (error, visit_count) => {
        if (error) {
            return res.status(400).json({ error });
        }
        res.status(200).json({visit_count, datetime});
        client.set("visit_count", parseInt(visit_count) + 1);
    });
});

app.listen(8081, () => {
    console.log("Listening on Port - 8081");
});