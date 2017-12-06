import Joi from 'joi';

const addressSchema = Joi.string()
  .alphanum()
  .min(1)
  .max(300);

const coordinatesSchema = Joi.number();

const accessTokenSchema = [Joi.string(), Joi.number()];

export const addressToCoordinatesSchema = Joi.object().keys({
  accessToken: accessTokenSchema,
  address: addressSchema
});

export const coordinatesToAddressSchema = Joi.object().keys({
  accessToken: accessTokenSchema,
  lat: coordinatesSchema,
  lon: coordinatesSchema
});
