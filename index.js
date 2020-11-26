const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('assets'));

const FROM_NUMBER = '+12013771840';
const TO_NUMBER = '+16299999319';

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
            text: `You pressed ${req.body.dtmf}`
        },
        {
            action: 'connect',
            from: FROM_NUMBER,
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
            text: `You pressed ${req.body.dtmf}`
        }]
        res.json(ncco)
    }

})

app.listen(3000, () => console.log('listening...'))