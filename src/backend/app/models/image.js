const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  type: String,
  title: String,
  description: String,
  user_id: Number,
  albums: Array
});

imageSchema.statics.findByUser = function(userId, callback) {
  return this.find({ user_id: userId }, callback);
};

mongoose.model('Image', imageSchema);

