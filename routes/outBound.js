require('dotenv').config()
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
var FormData = require('form-data');
const Call_API_SID_Token = 'ACde8251b956b7958116ec3c1b59d41790';
const Token = 'f8ca067f-6742-48ef-8868-f325a5373d8d';
router.use(bodyParser.json());

router.get('/', (req, res) => {
    var data = new FormData();
    data.append('From', req.callerId);
    data.append('To', req.forwardTo);
    data.append('Url', 'https://api.teleapi.net/rcml/fourscore.xml');

    var config = {
        method: 'post',
        url: `https://api.teleapi.net/call/2012-04-24/Accounts/${Call_API_SID_Token}/Calls.json`,
        headers: {
            'Authorization': 'Basic ZjhjYTA2N2YtNjc0Mi00OGVmLTg4NjgtZjMyNWE1MzczZDhkOkFDZGU4MjUxYjk1NmI3OTU4MTE2ZWMzYzFiNTlkNDE3OTA=',
            ...data.getHeaders()
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
})

module.exports = router;