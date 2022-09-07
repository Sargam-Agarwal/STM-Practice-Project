const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const FileCollections = require('./models/file.js');
const dateFormatter = require('date-and-time');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync('../multerUploads');
        cb(null, '../multerUploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.fileName);
    }
})

const upload = multer({ storage: storage });

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

app.listen(8000);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    FileCollections.find().then((result) => {
        res.render('home_page.ejs', { files: result, dateFormatter: dateFormatter });
    }).catch(err => console.log(err));
});

var commonPath = '/get-file';
app.get(`${commonPath}-:id`, (req, response) => {
    FileCollections.findById(mongoose.Types.ObjectId(req.params.id)).then((result) => {
        fs.writeFileSync(`./${result.fileName}`, result.fileURL);
    });
    response.redirect('/');
});

app.get('/add-new-file', (req, res) => {
    res.sendFile('./views/add_new_file.html', { root: __dirname });
})

app.post('/files', upload.single('uploaded-file'), (req, res) => {
    console.log(req);
    // console.log(req.body);
    // const file = new FileCollections(req.body);

    // file.save().then(() => console.log("Saved Successfully!")).catch(err => console.log(err));

    // res.redirect('/');
});

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})