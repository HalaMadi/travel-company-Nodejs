// src/modules/auth/auth.validation.js
import Joi from 'joi';

export const registerSchema = Joi.object({
    userName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const sendCodeSchema = Joi.object({
    email: Joi.string().email().required(),
})

export const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    code: Joi.string().required(),
});