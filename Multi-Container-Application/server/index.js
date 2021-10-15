const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");
const { Pool } = require("pg")

// Environment Variables
const {
    REDIS_HOST,
    REDIS_PORT,
    PGUSER,
    PGPASSWORD,
    PGDATABASE,
    PGHOST,
    PGPORT
} = process.env;

// Initialize Express & Middleware
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const dbClient = new Pool({
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    port: PGPORT
});

dbClient.on("error", () => console.log("Lost PostgreSQL Connection!"));
dbClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.log(err));

const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

app.get("/", (req, res) => {
    const datetime = new Date().toUTCString();
    res.status(200).json({ message: "Hello from Server", datetime });
});

app.get("/values/all", async (req, res) => {
    const values = await dbClient.query("SELECT * FROM values")
    res.status(200).send(values.rows);
});

app.get("/values/current", async (req, res) => {
    redisClient.hgetall("values", (error, values) => {
        if (error) {
            return res.status(400).json({ error });
        }
        res.status(200).send(values);
    });
});

app.post("/values", async (req, res) => {
    const { index } = req.body;
    if (parseInt(index) > 40) {
        res.status(400).send({ error: `Sorry! Index - ${index} is greater than 40.` });
    } else {
        redisClient.hset("values", index, "Nothing yet!");
        redisPublisher.publish("insert", index);
        dbClient.query("INSERT INTO values(number) VALUES($1)", [index]);
        res.status(201).send({ message: "Calculation In Progress!" });
    }
});

app.listen(5000, () => {
    console.log("Listening API Server on Port - 5000");
});
