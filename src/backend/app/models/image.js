const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ImageSchema = new Schema({
  type: String,
  title: String,
  description: String,
  user_id: Number,
  albums: Array
});

 // ImageSchema.query.byUser = function(user_id) {
 //   return this.find({ user_id: user_id });
 // };

// ImageSchema.static.findByUser = function(user_id, callback) {
//   return this.find({ user_id: user_id }, callback);
// };

mongoose.model('Image', ImageSchema);

