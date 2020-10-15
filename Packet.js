const mongoose = require('mongoose');

const packetSchema = new mongoose.Schema({
  TIME: String,
  IP_SRC: String,
  PROTOCOL: Number
});

module.exports = mongoose.model('packets', packetSchema);
