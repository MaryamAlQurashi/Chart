const express = require('express');
const app = express();
const server = require('http').createServer(app);
const faker = require('faker');
const port = process.env.PORT || 27017;

// packet model
const Packet = require('./models/Packet');
require('./libs/db-connection');
// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  let Slack, Zu, Teamwork, Google, Facebook, Twitter, GitHub, LinkedIn;
  Packet.find({})
    .then(packets => {
      Slack = packets.filter(packet => packet.IP_SRC  == '192.168.0.179');
      Zu = packets.filter(packet => packet.IP_SRC ==  '172.16.31.95');
      Teamwork = packets.filter(packet => packet.IP_SRC ==  '93.184.220.29');
      Google = packets.filter(packet => packet.IP_SRC ==  '94.206.5.32');
      Facebook = packets.filter(packet => packet.IP_SRC ==  '4.2.2.2');
      Twitter = packets.filter(packet => packet.IP_SRC ==  '52.208.238.241');
      GitHub = packets.filter(packet => packet.IP_SRC ==  '140.82.114.26');
      LinkedIn = packets.filter(packet => packet.IP_SRC ==  '23.39.199.181');

      res.render('index', {'192.168.0.179': Slack.length, '172.16.31.95': Zu.length, '93.184.220.29': Teamwork.length, '94.206.5.32': Google.length, '4.2.2.2': Facebook.length, '52.208.238.241': Twitter.length, '140.82.114.26': GitHub.length, '23.39.199.181': LinkedIn.length});
    })
    .catch(err => console.error(err));
});

server.listen(port, () => console.log(`App running on port ${port}`));

