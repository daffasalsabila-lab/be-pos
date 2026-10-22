import Joi from "joi";

export const loginSchema = Joi.object({
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