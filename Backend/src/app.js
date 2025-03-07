const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors');

const app = express();

// app.use(cors({origin: process.env.CORS_ORIGIN || "*"}));
const corsOptions = {
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"], // Allow local and deployed frontend
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('hello world');
})

app.use('/ai', aiRoutes)


module.exports = app;