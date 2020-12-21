// logs message upon starting app
console.log('app started');

// imports express module & initializes express app
const express = require('express');
const app = express();

// imports built-in node path module
const path = require('path');

// imports body parser module
const bodyParser = require('body-parser');

// sets port varaible
const port = process.env.PORT || 3000;

// imports mongodb node driver & creates const for hosted mongo url
const MongoClient = require('mongodb').MongoClient;

// hosted mongodb instance url
const url = 'mongodb://localhost:27017/database';

// sets view folder
app.set('views', path.join(__dirname, 'views'));

// sets view engine
app.set('view engine', 'ejs');

// bodyParser middleware (returns POST requests as JSON)
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// creates const for name of our database
const dbName = 'database';

// creates GET request route for index
app.get('/', (req, res) => {

  // opens connection to mongodb
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'pkts' collection in database
    const col = db.collection('packets');

    // finds ALL pkts in 'pkts' collection/converts to array
    col.find({}, {"_id":0, "DATE":1, "PROTOCOL": 1}).skip(700000).limit(10).toArray().then(docs => {

      // logs message upon finding collection
      console.log('found pkts for index');

      // renders index ejs template and passes pkts array as data
      res.render('index', {
        pkts: docs
      });

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error in finding 'pkts' collection
    }).catch(err => {

      // logs message upon error in finding 'pkts' collection
      console.log('error finding pkts', err);

    });

  // checks for error in connecting to mongodb
  }).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

  });

});



// creates GET request route for /api/data page
app.get('/api/data', (req, res) => {

  // opens connection to mongodb
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'pkts' collection in database
    const col = db.collection('packets');

    // finds ALL pkts in 'pkts' collection/converts to array
    col.find({}, {"DATE": 1, "PROTOCOL" : 1, "_id": 0}).skip(650000).limit(6700).toArray().then(docs => {

      // logs message upon finding 'pkts' collection
      console.log('found pkts for api');

      // sends/renders pkts array to /api/data page
      res.send(docs);

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error finding 'pkts' collection
    }).catch(err => {

      // logs message upon error finding 'pkts' collection
      console.log('unable to find pkts for api', err);

    });

  // checks for error in connecting to mongodb
  }).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

  });

});

// listens to port 300 and logs message when listening
app.listen(port, () => console.log(`listening on ${port}`));
