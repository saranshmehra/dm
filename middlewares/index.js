const joi = require('joi');

const saveValidation = (req, res, next) => {
  const user = joi.object({
    name: joi.string()
      .required(),
    email: joi.string()
      .email()
      .required()
  });
  const { error } = user.validate(req.body);
  if (error) {
    return res.send(error.message);
  }
  next();
};

const editValidation = (req, res, next) => {
  const user = joi.object({
    name: joi.string()
      .allow(''),
    email: joi.string()
      .email()
      .allow('')
  });
  const { error } = user.validate(req.body);
  if (error) {
    return res.send(error.message);
  }
  next();
};

module.exports = { saveValidation, editValidation };
