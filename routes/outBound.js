require('dotenv').config()
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    console.log(req.body);
    res.send('Yahoo!');
})
