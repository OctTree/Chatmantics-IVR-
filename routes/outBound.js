require('dotenv').config()
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const axios = require('axios');
var FormData = require('form-data');
const buffer = require('buffer/').Buffer;
const Call_API_SID_Token = 'ACde8251b956b7958116ec3c1b59d41790';
const Token = 'f8ca067f-6742-48ef-8868-f325a5373d8d';

router.all('/', (req, res) => {
    var data = new FormData();
    var varToken = buffer.from(`${Token}:${Call_API_SID_Token}`).toString('base64');
    data.append('From', req.query.callerId);
    data.append('To', req.query.To);
    data.append('Url', 'https://api.teleapi.net/rcml/fourscore.xml');

    var config = {
        method: 'post',
        url: `https://api.teleapi.net/call/2012-04-24/Accounts/${Call_API_SID_Token}/Calls.json`,
        headers: {
            'Authorization': `Basic ${varToken}`,
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.send('calling...')
        })
        .catch(function (error) {
            console.log(error);
        });
})

module.exports = router;