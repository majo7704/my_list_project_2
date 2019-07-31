const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  server: String,
  idApi: String,
  secret: String,
  state: String,
  title: String
});
const Goal = mongoose.model('goals', goalSchema)

module.exports = Goal;