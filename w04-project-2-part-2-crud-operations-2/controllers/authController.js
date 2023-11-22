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

const redirect = (req, res) => {
  res.redirect("/")
}

export {
  googleAuthenticate,
  googleCallback,
  redirect
}