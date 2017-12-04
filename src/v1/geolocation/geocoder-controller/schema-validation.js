import Joi from 'joi';

const addressSchema = Joi.string()
  .alphanum()
  .max(300);

const coordinatesSchema = Joi.number();

export const addressToCoordinatesSchema = Joi.object().keys({
  address: addressSchema
});

export const coordinatesToAddressSchema = Joi.object().keys({
  lat: coordinatesSchema,
  lon: coordinatesSchema
});
