const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('assets'));
const port = 3000;
const TO_NUMBER = '+18333210371';
const TO_NUMBER_SJ = '+18334800563';
const TO_NUMBER_OB = '+17867891610';

app.get('/webhooks/answer', (req, res) => {
    const ncco = [{
        action: "stream",
        streamUrl: ["http://3.88.217.29:3000/stream/Credit_Repair_IVR.mp3"],
        level: 1,
        bargeIn: true

    },
    {
        action: 'input',
        maxDigits: 1,
        eventUrl: [`${req.protocol}://${req.get('host')}/webhooks/dtmf`]
    }
    ]

    res.json(ncco)
})

app.post('/webhooks/events', (req, res) => {
    console.log(req.body)
    res.send(200);
})

app.post('/webhooks/dtmf', (req, res) => {
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
        res.json(ncco)
    }

})


app.get('/webhook_sj/answer', (req, res) => {
    const ncco = [{
        action: "stream",
        streamUrl: ["http://3.88.217.29:3000/stream/Credit_Repair_IVR.mp3"],
        level: 1,
        bargeIn: true

    },
    {
        action: 'input',
        maxDigits: 1,
        eventUrl: [`${req.protocol}://${req.get('host')}/webhook_sj/dtmf`]
    }
    ]

    res.json(ncco)

})

app.post('/webhook_sj/events', (req, res) => {
    console.log(req.body)
    res.send(200);
})

app.post('/webhook_sj/dtmf', (req, res) => {
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
                number: TO_NUMBER_SJ
            }]
        },
        ]
        res.json(ncco)
    }
    else if (req.body.dtmf == '2') {
        const ncco = [{
            action: 'talk',
        }]
        res.json(ncco)
    }

})


app.get('/webhook_ob/answer', (req, res) => {
    const ncco = [{
        action: "stream",
        streamUrl: ["http://3.88.217.29:3000/stream/Health_IVR.mp3"],
        level: 1,
        bargeIn: true

    },
    {
        action: 'input',
        maxDigits: 1,
        eventUrl: [`${req.protocol}://${req.get('host')}/webhook_ob/dtmf`]
    }
    ]

    res.json(ncco)

})

app.post('/webhook_ob/events', (req, res) => {
    console.log(req.body)
    res.send(200);
})

app.post('/webhook_ob/dtmf', (req, res) => {
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
                number: TO_NUMBER_OB
            }]
        },
        ]
        res.json(ncco)
    }
    else if (req.body.dtmf == '2') {
        const ncco = [{
            action: 'talk',
        }]
        res.json(ncco)
    }

})

app.listen(port, () => console.log(`App listening on port ${port}!`));