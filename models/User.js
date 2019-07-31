const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  goals: [{type : ObjectId, ref:'goals'}],
  completedGoals: [{type: ObjectId, ref: 'goals'}],
}, {
  timestamps: true
});
const User = mongoose.model('users', userSchema)

module.exports = User;