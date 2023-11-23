import {body, validationResult} from "express-validator";

const dogValidationRoutes = () => {
  return [
    body('breed')
      .isString()
      .notEmpty()
      .withMessage("Breed needs to be a string"),
    body('size')
      .isString()
      .notEmpty()
      .withMessage("Size needs to be a string"),
    body('temperament')
      .isString()
      .notEmpty()
      .withMessage("Temperament needs to be a string"),
    body('life_span')
      .isString()
      .notEmpty()
      .withMessage("Life span needs to be a string"),
    body("origin")
      .isString()
      .notEmpty()
      .withMessage("Origin needs to be a string"),
    body("color")
      .isString()
      .notEmpty()
      .withMessage("Color needs to be a string"),
    body("intelligence")
      .isString()
      .notEmpty()
      .withMessage("Intelligence needs to be a string"),
    body("shedding_level")
      .isString()
      .notEmpty()
      .withMessage("Shedding level needs to be a string"),
    body("exercise_needs")
      .isString()
      .notEmpty()
      .withMessage("Exercise needs needs to be a string")
  ];
};

const horseValidationRoutes = () => {
  return [
    body('breed')
      .isString()
      .notEmpty()
      .withMessage("Breed needs to be a string"),
    body('size')
      .isString()
      .notEmpty()
      .withMessage("Size needs to be a string"),
    body('temperament')
      .isString()
      .notEmpty()
      .withMessage("Temperament needs to be a string"),
    body('life_span')
      .isString()
      .notEmpty()
      .withMessage("Life span needs to be a string"),
    body("origin")
      .isString()
      .notEmpty()
      .withMessage("Origin needs to be a string"),
    body("color")
      .isString()
      .notEmpty()
      .withMessage("Color needs to be a string"),
    body("speed")
      .isString()
      .notEmpty()
      .withMessage("Speed needs to be a string"),
    body("endurance")
      .isString()
      .notEmpty()
      .withMessage("Endurance level needs to be a string"),
    body("height")
      .isString()
      .notEmpty()
      .withMessage("Height needs needs to be a string")
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({[err.path]: err.msg}));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export {
  dogValidationRoutes,
  horseValidationRoutes,
  validate,
};