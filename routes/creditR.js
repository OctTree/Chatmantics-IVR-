const express = require("express");
const router = express.Router();

// const TO_NUMBER = '+18333210371';
const TO_NUMBER = process.env.TO_NUMBER;

router.get('/answer', (req, res) => {
    const ncco = [
        {
            action: "stream",
            streamUrl: ["http://3.88.217.29:3000/stream/Credit_Repair_IVR.mp3"],
            level: 1,
            bargeIn: true

        },
        {
            action: 'input',
            maxDigits: 1,
            type: ['dtmf'],
            dtmf: {
                timeOut: 5,
            },
            eventUrl: [`${req.protocol}://${req.get('host')}/webhooks/dtmf`]
        }
    ];
    res.json(ncco);
});

router.post('/events', (req, res) => {
    console.log(req.body);
    res.send(200);
});

router.post('/dtmf', (req, res) => {
    console.log(req.body);
    const { dtmf: { digits, timed_out: timedOut } } = req.body;
    if (timedOut) {
        // Disconenct the call
        return res.json([]);
    }
    if (digits === '1') {
        const ncco = [
            {
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
        ];
        res.json(ncco);
    } else if (digits === '2') {
        const ncco = [{
            action: 'talk',
        }];
        res.json(ncco);
    }
    return res.json([]);
});

module.exports = router;



