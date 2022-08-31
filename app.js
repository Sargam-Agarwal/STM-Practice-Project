const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://dummyUser:password1234@files.ntdja5q.mongodb.net/?retryWrites=true&w=majority';

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dbURI, connectionParams).then(() => {
    console.log("Connected Successfully");
}).catch((err) => {
    console.log(err);
})

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('./views/add_new_file.html', { root: __dirname });
})

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})