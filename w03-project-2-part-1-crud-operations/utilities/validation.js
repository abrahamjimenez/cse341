const {body, validationResult} = require("express-validator");

const animalRules = () => {
  return [
    body('breed')
      .notEmpty()
      .withMessage('Breed is required'),
    body('size')
      .notEmpty()
      .withMessage('Size is required'),
    body('temperament')
      .isArray()
      .withMessage('Temperament should be an array'),
    body('life_span')
      .notEmpty()
      .withMessage('Life span is required'),
    body('origin')
      .notEmpty()
      .withMessage('Origin is required'),
    body('color')
      .isArray()
      .withMessage('Color should be an array'),
    body('characteristics.intelligence')
      .notEmpty()
      .withMessage('Intelligence is required'),
    body('characteristics.shedding_level')
      .notEmpty()
      .withMessage('Shedding level is required'),
    body('characteristics.exercise_needs')
      .notEmpty()
      .withMessage('Exercise needs is required'),
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
  animalRules,
  validate
};