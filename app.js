const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('./views/add_new_file.html', { root: __dirname });
})

app.use((req, res) => {
    res.sendFile('./views/404.html', { root: __dirname });
})