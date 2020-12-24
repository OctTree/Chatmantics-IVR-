require('dotenv').config()
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const TO_NUMBER = process.env.TO_NUMBER;

router.use(bodyParser.json());
router.get('/answer', (req, res) => {

    axios.get(`https://api.console.chatmantics.com/v1/dnc/check?phoneNumber=${req.query.from}`)
        .then(response => {
            console.log(`Chatmantics Internal CreditR => dnc: ${response.data.dnc}`);
            if (response.data.dnc === false) {
                const ncco = [{
                    action: "stream",
                    streamUrl: ["http://ivrn.chatmantics.com:3000/stream/Credit_Repair_IVR.mp3"],
                    level: 1,
                    bargeIn: true
                },
                {
                    action: 'input',
                    maxDigits: 1,
                    eventUrl: [`${req.protocol}://${req.get('host')}/webhooks/dtmf`]
                }
                ]

                res.json(ncco);
            }
            else if(response.data.dnc === true){
                const ncco = [{
                    action: 'talk'
                }]
                res.json(ncco);
            }
        })
        .catch(error => console.error(error));

})

router.post('/events', (req, res) => {
    console.log(req.body)
    res.send(200);
})

router.post('/dtmf', (req, res) => {
    if (req.body.dtmf == '1') {
        const ncco = [{
            action: 'talk',
            text: `Please hold while we transfer your call.`
        },
        {
            action: 'connect',
            from: req.body.from,
            endpoint: [{
                type: 'phone',
                number: TO_NUMBER
            }]
        },
        ]
        res.json(ncco)
    }
    else if (req.body.dtmf == '2') {
        const ncco = [{
            action: 'talk',
        }]
        try {
            axios.get(`https://api.console.chatmantics.com/v1/dnc?phoneNumber=${req.body.from}`);
        } catch (err) {
            console.log(err);
        }
        res.json(ncco);
    }

})

module.exports = router;



