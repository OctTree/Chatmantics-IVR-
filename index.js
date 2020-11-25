const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/webhooks/answer', (req, res) => {
    console.log(__dirname + "/assets/stream/Credit_Repair_IVR.mp3");
    const ncco = [{
        action: "stream",
        streamUrl: [__dirname + "/assets/stream/Credit_Repair_IVR.mp3"]
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
   const ncco = [{
     action: 'talk',
     text: `You pressed ${req.body.dtmf}`
   }]
  
   res.json(ncco)
 })

app.listen(3000, () => console.log('listening...'))