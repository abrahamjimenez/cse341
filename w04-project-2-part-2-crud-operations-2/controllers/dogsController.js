// @desc      Get all dogs
// @route     GET /dashboard/dogs
// @access    Private
const getAllDogs = async (req, res) => {
  res.send("Get all dogs");
}

// @desc      Get dog by id
// @route     GET /dashboard/dogs/:id
// @access    Private
const getDogById = async (req, res) => {
  res.send("Get dog by id");
}

// @desc      Create dog
// @route     POST /dashboard/dogs
// @access    Private
const createDog = async (req, res) => {
  res.send("Create dog");
}

// @desc      Update dog
// @route     PUT /dashboard/dogs/:id
// @access    Private
const updateDog = async (req, res) => {
  res.send("Update dog");
}

// @desc      Delete dog
// @route     DELETE /dashboard/dogs/:id
// @access    Private
const deleteDog = async (req, res) => {
  res.send("Delete dog");
}

export {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
}