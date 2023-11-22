const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horseSchema = new Schema({
  _id: Schema.Types.ObjectId,
  breed: String,
  size: String,
  temperament: [String],
  life_span: String,
  origin: String,
  color: [String],
  characteristics: {
    intelligence: String,
    shedding_level: String,
    exercise_needs: String
  }
});

const Horse = mongoose.model('Horse', horseSchema);

module.exports = Horse;