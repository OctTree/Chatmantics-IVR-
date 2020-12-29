require('dotenv').config()

const express = require('express');
const app = express();
const creditrRouter = require('./routes/creditR');
const creditr_sjRouter = require('./routes/creditR_SJ');
const health_obRouter = require('./routes/health_OB');
const creditr_secRouter = require('./routes/creditR_Second');
const creditr_ttsRouter = require('./routes/creditR_TTS');
const dms_autoRouter = require('./routes/DMS_AUTO');
const port = process.env.PORT;

app.use('/webhooks', creditrRouter);
app.use('/webhook_sj', creditr_sjRouter);
app.use('/webhook_ob', health_obRouter);
app.use('/webhook_sec', creditr_secRouter);
app.use('/webhook_tts', creditr_ttsRouter);
app.use('/webhook_dms_auto', dms_autoRouter);
app.use(express.static('assets'));

app.listen(port, () => console.log(`App listening on port ${port}!`));