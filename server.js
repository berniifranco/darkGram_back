const express = require('express');
const PORT = 4000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const {MONGOBD_URL} = require('./config');

mongoose.connect(MONGOBD_URL);

mongoose.connection.on('connected', () => {
    console.log('DB connected');
});

mongoose.connection.on('error', (error) => {
    console.log('some error to connecting de DB');
});

app.use(cors());
app.use(express.json());

require('./models/userModels');
require('./routes/userRoutes');

app.listen(PORT, () => {
    console.log('Server started');
})