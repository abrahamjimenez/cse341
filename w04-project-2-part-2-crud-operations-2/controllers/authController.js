import passport from "passport";

// @desc    Authenticate with Google
// @route   GET /auth/google
// @access  Public
const googleAuthenticate = async (req, res, next) => {
  passport.authenticate("google", {scope: ["profile"]})
  (req, res, next)
}

// @desc    Google auth callback
// @route   GET /auth/google/callback
// @access  Public
const googleCallback = async (req, res, next) => {
  passport.authenticate("google", {faliureRedirect: "/"})
  (req, res, next)
}

// @desc  Logout user
// @route GET /auth/logout
// @access Public
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({message: "Something went wrong"});
    }

    res.redirect("/");
  });
};

const dashboardRedirect = (req, res) => {
  res.redirect("/")
}

export {
  googleAuthenticate,
  googleCallback,
  logout,
  dashboardRedirect
}