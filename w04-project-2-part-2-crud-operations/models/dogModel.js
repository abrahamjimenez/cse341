import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dogSchema = new Schema({
  breed: String,
  size: String,
  temperament: String,
  life_span: String,
  origin: String,
  color: String,
  intelligence: String,
  shedding_level: String,
  exercise_needs: String
});

const Dog = mongoose.model('Dog', dogSchema);

export default Dog;