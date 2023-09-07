const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const createCheckoutSession = require('./api/checkout')
const stripeAPI = require('./stripe');

const app = express();
const PORT = process.env.PORT || 8080;

// app.use((req, res, next) => {
//     res.header({"Access-Control-Allow-Origin": "*h"});
//     next();
// }) 

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/' , (req, res) => {
    res.send('hello world')
})

app.post('/create-checkout-session' , createCheckoutSession)

app.listen(PORT, () => console.log('server is listening on port:',PORT));