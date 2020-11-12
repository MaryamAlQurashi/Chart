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
  MongoClient.connect(url).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'packets' collection in database
    const col = db.collection('httpresponse');

    let pkttime, pktp, pktp2, dtime;
    // finds ALL packets in 'packets' collection/converts to array
    col.find({}).toArray().then(docs => {

      // logs message upon finding collection
      console.log('found packets for index');
      console.log(docs);

      dtime = parseInt(docs.Time.getHours());
      pkttime = [dtime in range (0,24)];
      pktp = docs.filter(doc => doc.Protocol == 6);
      pktp2 = docs.filter(doc => doc.Protocol == 17);

      

      // renders index ejs template and passes packets array as data
      res.render('index', {
        packets: docs, time: pkttime, tcp: pktp, udp: pktp2, tcpc: pktp.length, udpc: pktp2.length
      });

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error in finding 'packets' collection
    }).catch(err => {

      // logs message upon error in finding 'packets' collection
      console.log('error finding packets', err);

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
  MongoClient.connect(url).then(client => {

    // creates const for our database
    const db = client.db(dbName);

    // creates const for 'packets' collection in database
    const col = db.collection('httpresponse');

    // finds ALL packets in 'packets' collection/converts to array
    col.find({}).toArray().then(docs => {

      // logs message upon finding 'packets' collection
      console.log('found packets for api');

      // sends/renders packets array to /api/data page
      res.send(docs);

      // closes connection to mongodb and logs message
      client.close(() => console.log('connection closed'));

    // checks for error finding 'packets' collection
    }).catch(err => {

      // logs message upon error finding 'packets' collection
      console.log('unable to find packets for api', err);

    });

  // checks for error in connecting to mongodb
  }).catch(err => {

    // logs message upon error connecting to mongodb
    console.log('error connecting to mongodb', err);

  });

});

// listens to port 300 and logs message when listening
app.listen(port, () => console.log(`listening on ${port}`));
