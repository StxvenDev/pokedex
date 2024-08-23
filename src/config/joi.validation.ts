import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    MONGO_BD : Joi.required(),
    PORT : Joi.number().default(3003),
    DEFAULT_LIMIT : Joi.number().default(5),
})