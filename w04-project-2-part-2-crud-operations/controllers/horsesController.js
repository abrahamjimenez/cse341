import Horse from "../models/horseModel.js"

// @desc      Get all horses
// @route     GET /dashboard/horses
// @access    Private
const getAllHorses = async (req, res) => {
  try {
    const horses = await Horse.find({});
    res.json(horses);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Get horse by id
// @route     GET /dashboard/horses/:id
// @access    Private
const getHorseById = async (req, res) => {
  try {
    const horse = await Horse.findById(req.params.id);

    if (horse) {
      res.json(horse);
    } else {
      res.status(404).json({message: "Horse not found"})
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Create horse
// @route     POST /dashboard/horses
// @access    Private
const createHorse = async (req, res) => {
  try {
    const {breed, size, temperament, life_span, origin, color, speed, endurance, height} = req.body;

    const horse = new Horse({
      breed,
      size,
      temperament,
      life_span,
      origin,
      color,
      speed,
      endurance,
      height
    });

    const createdHorse = await horse.save();

    res.status(201).json(createdHorse);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Update horse
// @route     PUT /dashboard/horses/:id
// @access    Private
const updateHorse = async (req, res) => {
  try {
    const {breed, size, temperament, life_span, origin, color, speed, endurance, height} = req.body;

    const horse = await Horse.findById(req.params.id);

    if (horse) {
      horse.breed = breed;
      horse.size = size;
      horse.temperament = temperament;
      horse.life_span = life_span;
      horse.origin = origin;
      horse.color = color;
      horse.speed = speed;
      horse.endurance = endurance;
      horse.height = height;

      const updatedHorse = await horse.save();

      res.status(201).json(updatedHorse);
    } else {
      res.status(404).json({message: "Horse not found"});
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Delete horse
// @route     DELETE /dashboard/horses/:id
// @access    Private
const deleteHorse = async (req, res) => {
  try {
    const horse = await Horse.findById(req.params.id);

    if (horse) {
      await horse.deleteOne({_id: req.params.id});
      res.status(200).json({message: "Horse removed"})
    } else {
      res.status(404).json({message: "Horse not found"});
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

export {
  getAllHorses,
  getHorseById,
  createHorse,
  updateHorse,
  deleteHorse
}