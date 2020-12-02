import { getRepository } from 'typeorm';
import Boom from '@hapi/boom';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../config/environment';

import User from './model.js';
import pagination from '../../utils/pagination';

const register = async (request, h) => {
  const results = {};
  const user = await getRepository(User).findOne({
    email: request.payload.email,
  });
  if (user) return Boom.badRequest('Email already exists');
  const userRepository = getRepository(User);
  const { name, email, password } = request.payload;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = userRepository.create(
      new User(name, email, hashPassword, false)
    );
    results.results = await userRepository.save(newUser);
    if (results.results) return h.response(results).code(201);
    return Boom.internal('Something happens');
  } catch (error) {
    return Boom.internal('Internal error');
  }
};

const login = async (request, h) => {
  const user = await getRepository(User).findOne({
    email: request.payload.email,
  });
  if (!user) return Boom.badRequest('Email doesnt exists');

  //check if password is correct
  const validPass = await bcrypt.compare(
    request.payload.password,
    user.password
  );
  if (!validPass) return Boom.badRequest('Wrong password');

  //Create web token
  const token = jwt.sign({ id: user.id }, env.TOKEN_SECRET);
  const response = h.response(token);
  response.header('Authorization', token);
  return response;
};

const saveUser = async (request, h) => {
  const results = {};
  try {
    const user = await getRepository(User).findOne({
      email: request.payload.email,
    });
    if (user) return Boom.badRequest('Email already exists');

    if (!request.admin) return Boom.forbidden('User no allow');
    request.payload.admin = request.payload.admin
      ? request.payload.admin
      : false;
    const newUser = request.payload;
    results.results = await getRepository(User).save(newUser);
    return h.response(results);
  } catch (error) {
    return Boom.internal(`User can't be save\nError: ${error}`);
  }
};

const getAllUsers = async (request, h) => {
  const page = request.query.page ? parseInt(request.query.page) : 1;
  const limit = request.query.limit ? parseInt(request.query.limit) : 5;
  const order = request.query.order ? request.query.order : 'DESC';
  const condition = request.admin ? {} : { id: request.user.id };
  const fieldOrder = { name: order };
  try {
    const results = await pagination(User, page, limit, fieldOrder, condition);
    return h.response(results).code(200);
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

const getUser = async (request, h) => {
  const results = {};
  if (!request.admin && request.user.id != request.params.id)
    return Boom.forbidden('User no allow');
  try {
    results.results = await getRepository(User).findOne(request.params.id);
    if (!results.results) return Boom.notFound('User not found');
    return h.response(results).code(200);
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

const updateUser = async (request, h) => {
  const results = {};
  try {
    if (!request.admin) return Boom.forbidden('User no allow');
    const user = await getRepository(User).findOne(request.params.id);
    if (user) {
      const newUser = getRepository(User).merge(user, request.payload);
      results.results = await getRepository(User).save(newUser);
      return h.response(results).code(202);
    }

    return Boom.notFound('Not user found');
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

const deleteUser = async (request, h) => {
  const results = {};
  try {
    if (!request.admin) return Boom.forbidden('User no allow');
    results.results = await getRepository(User).delete(request.params.id);
    return h.response(results).code(203);
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

export {
  saveUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
};
