const axios = require('axios');
const express = require("express");
const querystring = require("querystring");
const { twiml } = require("twilio");
const router = express.Router();

router.all('/init', (req, res) => {
  try {
    res.set('Content-Type', 'text/xml');
    const { VoicemailDetector: voiceMailDetector } = req.body;
    const response = new twiml.VoiceResponse();
    if (voiceMailDetector === 'voicemail') {
      return res.status(200).send(response.toString());
    }
    response
      .gather({
        action: `${req.protocol}://${req.get('host')}/teli/dtmf?${querystring.stringify(req.query)}`,
        method: 'POST',
        numDigits: 1,
      })
      .play(`${req.protocol}://${req.get('host')}/stream/Credit_Repair_IVR.mp3`);
    console.log(response.toString());
    return res.status(200).send(response.toString());
  } catch (err) {
    console.log(err);
    return res.status(200).send(new twiml.VoiceResponse().toString());
  }
});

router.post('/dtmf', async (req, res) => {
  try {
    res.set('Content-Type', 'text/xml');
    const { to } = req.query;
    console.log(req.body);
    const { Digits: digits, To: callerId } = req.body;
    const response = new twiml.VoiceResponse();
    if (digits === '1') {
      if (callerId) {
        response.dial({
          callerId: `+1${callerId.substr(-10)}`,
        }, `+1${to.substr(-10)}`);
      } else {
        response.dial(`+1${to.substr(-10)}`);
      }
    } else {
      await axios.get(`https://api.console.chatmantics.com/v1/dnc?phoneNumber=${callerId}`);
    }
    console.log(response.toString());
    return res.status(200).send(response.toString());
  } catch (err) {
    console.log(err);
    return res.status(200).send(new twiml.VoiceResponse().toString());
  }
});

module.exports = router;