import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';

import env from '../config/environment.js';
import User from '../components/users/model.js';

// eslint-disable-next-line no-unused-vars
const auth = async function (decoded, request, h) {
  const token = request.headers.authorization;
  if (!token) throw Boom.notFound('JWT not found');

  try {
    const userId = jwt.verify(token, env.TOKEN_SECRET);
    request.user = await getRepository(User).findOne({ id: userId.id });
    request.admin = request.user.admin;
    if (request.user) return { isValid: true };
    return { isValid: false };
  } catch (err) {
    throw Boom.badRequest('Wrong JWT');
  }
};

export default auth;
