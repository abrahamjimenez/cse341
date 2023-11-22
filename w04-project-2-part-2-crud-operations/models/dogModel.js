const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
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
  },
  token: String
});

const Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;