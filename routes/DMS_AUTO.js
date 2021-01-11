require('dotenv').config()
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const TO_DMS_AUTO = process.env.TO_DMS_AUTO;

router.use(bodyParser.json());
router.get('/answer', (req, res) => {

    axios.get(`https://api.console.chatmantics.com/v1/dnc/check?phoneNumber=${req.query.from}`)
        .then(response => {
            console.log(`Chatmantics Internal CreditR => dnc: ${response.data.dnc}`);
            if (response.data.dnc === false) {
                const ncco = [{
                    action: "stream",
                    streamUrl: ["http://ivrn.chatmantics.com:3000/stream/Auto Ins Jan 2021 v2.mp3"],
                    level: 1,
                    bargeIn: true
                },
                {
                    action: 'input',
                    maxDigits: 1,
                    eventUrl: [`${req.protocol}://${req.get('host')}/webhook_dms_auto/dtmf`]
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
                number: TO_DMS_AUTO
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