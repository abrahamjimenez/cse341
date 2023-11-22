// @desc      Get all horses
// @route     GET /dashboard/horses
// @access    Private
const getAllHorses = async (req, res) => {
  res.send("Get all horses");
}

// @desc      Get horse by id
// @route     GET /dashboard/horses/:id
// @access    Private
const getHorseById = async (req, res) => {
  res.send("Get horse by id");
}

// @desc      Create horse
// @route     POST /dashboard/horses
// @access    Private
const createHorse = async (req, res) => {
  res.send("Create horse");
}

// @desc      Update horse
// @route     PUT /dashboard/horses/:id
// @access    Private
const updateHorse = async (req, res) => {
  res.send("Update horse");
}

// @desc      Delete horse
// @route     DELETE /dashboard/horses/:id
// @access    Private
const deleteHorse = async (req, res) => {
  res.send("Delete horse");
}

export {
  getAllHorses,
  getHorseById,
  createHorse,
  updateHorse,
  deleteHorse
}