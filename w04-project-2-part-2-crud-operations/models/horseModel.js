import mongoose from "mongoose";
const Schema = mongoose.Schema;

const horseSchema = new Schema({
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

const Horse = mongoose.model('Horse', horseSchema);

export default Horse;