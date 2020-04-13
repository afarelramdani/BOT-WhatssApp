const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) { //mengecek apakah udah ada session yang tersimpan
    sessionCfg = require(SESSION_FILE_PATH);
}
const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });
client.initialize();
client.on('qr', (qr) => { //menampilkan qr code dan menerima qr code
    console.log('QR RECEIVED', qr);
});
client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {  //jika session belum tersimpan maka akan membuat session baru 
        if (err) {
            console.error(err);
        }
    });
});
client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});
client.on('ready', () => {
    console.log('READY');
});
client.on('message', async msg => {
     if (msg.body == '!corona') {
        msg.reply('Info Detail Corona');
    }

});
client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});