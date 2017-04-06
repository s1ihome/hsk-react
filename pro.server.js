const path = require('path');
const express = require('express');
var compression = require('compression')
const bodyParser = require('body-parser');

const port = 8001
const app = express();

app.use(compression())
app.use('/assets', express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
