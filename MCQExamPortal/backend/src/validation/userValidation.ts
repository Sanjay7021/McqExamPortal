import Joi from 'joi';

const userRegistrationValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required()
        .messages({ 'any.required': "abcd is required", 'string.email': "Please Enter isasd invalid", 'any.lowercase': "Username must be lowercase" }),
    username: Joi.string()
        .min(3)
        .required()
        .messages({ 'string.min': "Username must be at lease 3 characters long", 'any.required': "Username is required" }),
    password: Joi.string()
        .required()
        .messages({ 'any.required': "Password is required" })
})
 
export { userRegistrationValidation }     
