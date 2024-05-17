
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})

var route1 = require('./status/index.js');
var route2 = require('./stats/index.js');


app.use('/route1', route1);
app.use('/route2', route2);
