var express = require('express');
var router = express.Router();

app.get('/status', (req, res) => {
    const status = {
        "Status": "Running"
    };
    response.send(status);
})