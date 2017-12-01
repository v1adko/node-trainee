import Joi from 'joi';

const addressSchema = Joi.string()
  .min(1)
  .max(300);

const createEventSchema = Joi.object().keys({
  address: addressSchema
});

export default createEventSchema;
