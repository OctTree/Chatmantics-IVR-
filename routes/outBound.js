require('dotenv').config()
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    axios({
        method: 'post',
        url: `https://api.teleapi.net/call/2012-04-24/Accounts/${Call_API_SID_Token}/Calls.json`,
        data: {
            From: '19174269335',
            To: '19174269339',
            Url: 'https://api.teleapi.net/rcml/fourscore.xml',
        },
        headers: {
            Authorization: `Basic ZjhjYTA2N2YtNjc0Mi00OGVmLTg4NjgtZjMyNWE1MzczZDhkOkFDZGU4MjUxYjk1NmI3OTU4MTE2ZWMzYzFiNTlkNDE3OTA=`,
        }
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.error(error))
    res.send('Yahoo!');
})

module.exports = router;