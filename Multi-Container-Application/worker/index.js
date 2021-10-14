const redis = require("redis");

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

const fib = (i) => {
    if (i < 2) {
        return 1;
    }

    return fib(i - 1) + fib(i - 2);
};

redisPublisher.on("message", (channel, message) => {
    redisClient.hset("values", message, fib(parseInt(message)))
});

redisPublisher.subscribe("insert");