const express = require('express');

const app = express();

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});