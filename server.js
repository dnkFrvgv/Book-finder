const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs')
const app = express();

const { API_KEY } = require('./config.js');
// const connection = require('./controllers/connection.js')

app.set('view engine', 'ejs');

app.use(express.static('public'));

// body parser config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// database connction
// try {
//     await connection.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error){
//     console.error('Unable to connect to the database:', error);
// }

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/asked', async (req, res) => {
    // get user search 
    title = req.body.title;

    // search volume list from google book api
    const result = request.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`, function (err, response, body){
        body = JSON.parse(body);
  
        let bookList = []

        body.items.forEach(item => {
            let arrVolumeInfo = item.volumeInfo;
            bookList.push(arrVolumeInfo)
        })


         console.log(bookList)

        res.render('results', {bookList: bookList, total: body.totalItems});
    })



});

app.listen(3000, () => {
    console.log('app running on port 3000');
});
