import Dog from "../models/dogModel.js"

// @desc      Get all dogs
// @route     GET /dashboard/dogs
// @access    Private
const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find({});
    res.json(dogs);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Get dog by id
// @route     GET /dashboard/dogs/:id
// @access    Private
const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (dog) {
      res.json(dog);
    } else {
      res.status(404).json({message: "Dog not found"})
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Create dog
// @route     POST /dashboard/dogs
// @access    Private
const createDog = async (req, res) => {
  try {
    const {breed, size, temperament, life_span, origin, color, characteristics} = req.body;

    const dog = new Dog({
      breed,
      size,
      temperament,
      life_span,
      origin,
      color,
      characteristics
    });

    const createDog = await dog.save();

    res.status(201).json(createDog);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Update dog
// @route     PUT /dashboard/dogs/:id
// @access    Private
const updateDog = async (req, res) => {
  try {
    const {breed, size, temperament, life_span, origin, color, characteristics} = req.body;

    const dog = await Dog.findById(req.params.id);

    if (dog) {
      dog.breed = breed;
      dog.size = size;
      dog.temperament = temperament;
      dog.life_span = life_span;
      dog.origin = origin;
      dog.color = color;
      dog.characteristics = characteristics;

      const updatedDog = await dog.save();

      res.json(updatedDog);
    } else {
      res.status(404).json({message: "Dog not found"})
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

// @desc      Delete dog
// @route     DELETE /dashboard/dogs/:id
// @access    Private
const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (dog) {
      await dog.deleteOne({_id: req.params.id});
      res.status(201).json({message: "Dog deleted"});
    } else {
      res.status(404).json({message: "Dog not found"})
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

export {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
}