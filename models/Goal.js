const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: {
    createdAt: "ceated_at",
    updatedAt: "updated_at"
  }
});
const Goal = mongoose.model('goals', goalSchema)

module.exports = Goal;