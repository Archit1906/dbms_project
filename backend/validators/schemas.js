const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(150).required(),
  password: Joi.string().min(6).max(255).required(),
  department: Joi.string().max(100).required(),
  year: Joi.number().integer().min(1).max(5).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const createEventSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().allow('', null),
  date: Joi.date().iso().required(),
  category: Joi.string().valid('Technical', 'Cultural', 'Sports', 'Other').required(),
  venue: Joi.string().max(200).required(),
  max_participants: Joi.number().integer().min(1).default(100)
});

const updateEventSchema = Joi.object({
  title: Joi.string().max(200),
  description: Joi.string().allow('', null),
  date: Joi.date().iso(),
  category: Joi.string().valid('Technical', 'Cultural', 'Sports', 'Other'),
  venue: Joi.string().max(200),
  max_participants: Joi.number().integer().min(1)
}).min(1);

const updateRegistrationStatusSchema = Joi.object({
  status: Joi.string().valid('Registered', 'Present', 'Absent', 'Cancelled').required()
});

module.exports = {
  registerSchema,
  loginSchema,
  createEventSchema,
  updateEventSchema,
  updateRegistrationStatusSchema
};
