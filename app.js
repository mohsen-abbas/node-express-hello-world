var express = require('express');
var fs = require('fs');
var app = express();
var routes = require('./routes/route.js');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// Function to read and parse secrets from /vault/secrets/config at runtime
function readSecrets() {
    try {
        const data = fs.readFileSync('/vault/secrets/config', 'utf8');
        const secrets = {};
        data.split('\n').forEach((line) => {
            if (line.startsWith('export')) {
                const keyValue = line.replace('export ', '').split('=');
                secrets[keyValue[0].trim()] = keyValue[1].replace(/"/g, '').trim();
            }
        });
        return secrets;
    } catch (err) {
        console.error('Error reading secret file:', err);
        return { username: 'Unknown user', password: 'Unknown password' };
    }
}

app.get('/', (req, res) => {
    const podName = process.env.POD_NAME || 'Unknown pod';
    const podIP = process.env.POD_IP || 'Unknown IP';
    
    // Fetch the secrets at runtime from the file
    const secrets = readSecrets();
    const vaultUsername = secrets.username || 'No username found';
    const vaultPassword = secrets.password || 'No password found';

    routes.home(req, res, podName, podIP, vaultUsername, vaultPassword);
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function (req, res) {
    console.log("Catch the action at http://localhost:" + port);
});
