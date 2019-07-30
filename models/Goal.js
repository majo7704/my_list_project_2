const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  server: String,
  id: String,
  secret: String
});
const Goal = mongoose.model('goals', goalSchema)

module.exports = Goal;