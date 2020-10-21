const mongoose = require('mongoose');

const packetSchema = new mongoose.Schema({
  TIME: Number,
  IP_SRC: String,
  PROTOCOL: Number
});

module.exports = mongoose.model('packets', packetSchema);
