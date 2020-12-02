import Joi from '@hapi/joi';
import {
  saveUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
} from './controller.js';

const routes = [
  {
    method: 'POST',
    path: '/login',
    // config: { auth: 'jwt' },
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: login,
  },
  {
    method: 'POST',
    path: '/register',
    // config: { auth: 'jwt' },
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: register,
  },
  {
    method: 'POST',
    path: '/users',
    // config: { auth: 'jwt' },
    options: {
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
          admin: Joi.boolean(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: saveUser,
  },
  {
    method: 'GET',
    path: '/users',
    config: { auth: 'jwt' },
    handler: getAllUsers,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    config: { auth: 'jwt' },
    handler: getUser,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    // config: { auth: 'jwt' },
    options: {
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          name: Joi.string().optional(),
          description: Joi.string().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: updateUser,
  },
  {
    method: 'DELETE',
    config: { auth: 'jwt' },
    path: '/users/{id}',
    handler: deleteUser,
  },
];
export default routes;
