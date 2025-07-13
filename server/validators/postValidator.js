const Joi = require('joi');

exports.postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().required(),
  author: Joi.string().required(), // add this
  slug: Joi.string().required()
});