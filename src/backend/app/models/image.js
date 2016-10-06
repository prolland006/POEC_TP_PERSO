const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  type: String,
  title: String,
  description: String,
  userId: String,
  albums: Array
});

imageSchema.statics.findByUser = function(userId, callback) {
  return this.find({ userId: userId }, callback);
};

mongoose.model('Image', imageSchema);

