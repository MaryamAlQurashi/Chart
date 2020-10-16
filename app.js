const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;

// packet model
const Packet = require('./models/Packet');
require('./libs/db-connection');
// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  let GitHub, Sap;
  Packet.find({})
    .then(packets => {
      GitHub = packets.filter(packet => packet.IP_SRC == '140.82.114.26');
      Sap = packets.filter(packet => packet.IP_SRC ==  '195.229.145.123');
      res.render('index', {gh: GitHub.length, sp: Sap.length});
    })
    .catch(err => console.error(err));
});


server.listen(port, () => console.log(`App running on port ${port}`));

