const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { enviarNotificacao } = require('./enviar-notificacao');
const { salvarSeguro, listarSeguros } = require("./seguro-service");
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');

const webpush = require('web-push');



// VAPID keys should only be generated only once.
const vapidKeys = { 
    publicKey: 'BFlGn5mEcLPW8Znn2SD7UDCiohSYHSMj-NnKUnDyOniNDY_2Y-ZKg_HcImrdq05vtGvp5f2wrq0bNQkL198f6YM',
    privateKey: 'pLDLZh5bcaPyFqtTNUVdeGOw9ha7apD-B_uAAYgoo0M' 
}

webpush.setVapidDetails(
    'mailto:kelvisbcc@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.route('/api/seguros').post(salvarSeguro);
app.route('/api/seguros').get(listarSeguros);
app.route('/api/notificacao').post(adicionaPushSubscriber);
app.route('/api/notificacao/enviar').post(enviarNotificacao);

const HOST = '127.0.0.1';
const PORT = 9000;

const httpServer = app.listen(PORT, HOST, () => {
    const msg = `Servidor rodando em http://${HOST}:${PORT}`;
    console.log(msg);
})