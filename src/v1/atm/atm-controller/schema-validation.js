import Joi from 'joi';

const accessTokenSchema = Joi.string().required();
const coordinatesSchema = Joi.number();

const getNearestSchema = Joi.object().keys({
  accessToken: accessTokenSchema,
  longitude: coordinatesSchema,
  latitude: coordinatesSchema
});

export default getNearestSchema;
