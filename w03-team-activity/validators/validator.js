const {body, validationResult} = require('express-validator');

const userValidationRules = () => {
	return [
		body('firstName')
			.isString()
			.notEmpty()
			.withMessage("First name must be a string"),
		body('lastName')
			.isString()
			.notEmpty()
			.withMessage("Last name must be a string"),
		body('email')
			.isEmail()
			.withMessage("Email must be a valid email address"),
		body("favoriteColor")
			.isString()
			.notEmpty()
			.withMessage("Favorite color must be a string"),
		body("birthday")
			.isString()
			.notEmpty()
			.withMessage("Birthday must be a string"),
		body("birthday")
			.isISO8601() // This checks if it's the right format, but not if it's a valid date
			.withMessage("Birthday must be a valid date"),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));

	return res.status(422).json({
		errors: extractedErrors,
	});
};

module.exports = {
	userValidationRules,
	validate,
};