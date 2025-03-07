const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// Properly split CORS_ORIGIN from .env to allow multiple origins
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : "*";

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/ai', aiRoutes);

module.exports = app;



// const express = require('express');
// const aiRoutes = require('./routes/ai.routes')
// const cors = require('cors');

// const app = express();

// // app.use(cors({origin: process.env.CORS_ORIGIN || "*"}));
// const corsOptions = {
//     origin: [process.env.CORS_ORIGIN, "http://localhost:5173"], // Allow local and deployed frontend
//     credentials: true
// };
// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//     res.send('hello world');
// })

// app.use('/ai', aiRoutes)


// module.exports = app;