const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const FileCollections = require('./models/file.js');

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
    // res.sendFile('./views/home_page.ejs', { root: __dirname });
    FileCollections.find().then((result) => {
        res.render('home_page.ejs', { files: result });
        // console.log(result[0].fileURL.toString());
        // fs.writeFileSync(`../${result[0].fileName}`, result[0].fileURL);
    }).catch(err => console.log(err));
});

app.get('/add-new-file', (req, res) => {
    res.sendFile('./views/add_new_file.html', { root: __dirname });
})

app.post('/files', (req, res) => {
    console.log(req.body);
    const file = new FileCollections(req.body);

    file.save().then(() => console.log("Saved Successfully!")).catch(err => console.log(err));

    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})