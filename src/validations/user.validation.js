import Joi from "joi";
// create
export const createSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required().messages({
        "string.empty": "Email cannot be empty",
        "string.email": "The Email format must be an email address",
        "string.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 8 characters long",   
        "string.required": "Password is required",
    }),
});
// update

export const updateSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required().messages({
        "string.empty": "Email cannot be empty",
        "string.email": "The Email format must be an email address",
        "string.required": "Email is required",
    }),
    password: Joi.string().min(8).optional().messages({
        "string.min": "Password must be at least 8 characters long",   
    }),
});