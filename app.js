const express = require('express');
const mongoose = require('mongoose');
const File = require('./models/file.js');

const app = express();

const dbURI = 'mongodb+srv://dummyUser:password1234@files.ntdja5q.mongodb.net/UploadedFiles?retryWrites=true&w=majority';

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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('./views/home_page.html', { root: __dirname });
});

app.get('/add-new-file', (req, res) => {
    res.sendFile('./views/add_new_file.html', { root: __dirname });
})

app.post('/files', (req, res) => {
    console.log(req.body);
    const file = new File(req.body);

    file.save().then(() => console.log("Saved Successfully!")).catch(err => console.log(err));

    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})