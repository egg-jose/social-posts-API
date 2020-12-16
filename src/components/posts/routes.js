import Joi from '@hapi/joi';
import {
  savePost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from './controller.js';

const routes = [
  {
    method: 'POST',
    path: '/posts',
    // config: { auth: 'jwt' },
    options: {
      payload: {
        maxBytes: 1024 * 1024 * 5,
        multipart: {
          output: 'file',
        },
        parse: true,
      },
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          text: Joi.string().required(),
          image: Joi.object().required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: savePost,
  },
  {
    method: 'GET',
    path: '/posts',
    config: { auth: false },
    handler: getAllPosts,
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    config: { auth: false },
    handler: getPost,
  },
  {
    method: 'PUT',
    path: '/posts/{id}',
    // config: { auth: 'jwt' },
    options: {
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          title: Joi.string().optional(),
          text: Joi.string().optional(),
          image: Joi.object().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: updatePost,
  },
  {
    method: 'DELETE',
    config: { auth: 'jwt' },
    path: '/posts/{id}',
    handler: deletePost,
  },
];
export default routes;
