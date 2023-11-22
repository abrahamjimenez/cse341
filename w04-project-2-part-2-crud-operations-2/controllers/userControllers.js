// @desc     Login user & get token
// @route    POST /users/login
// @access   Public
const loginUser = async (req, res) => {
  res.send("Login route");

  // const { email, password } = req.body;
  // const user = await User.findOne({email});
}

// @desc    Logout user
// @route   POST /users/logout
// @access  Private
const logoutUser = async (req, res) => {
  res.send("Logout route");
}

// @desc    Register User
// @route   POST /users
// @access  Public
const registerUser = async (req, res) => {
  res.send("Register route");
}

export {
  loginUser,
  logoutUser,
  registerUser
}