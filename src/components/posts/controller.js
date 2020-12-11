import { getRepository } from 'typeorm';
import Boom from '@hapi/boom';

import Post from './model.js';
import pagination from '../../utils/pagination';

const savePost = async (request, h) => {
  const results = {};
  try {
    request.payload.user = request.user;
    const newPost = request.payload;
    results.results = await getRepository(Post).save(newPost);
    return h.response(results);
  } catch (error) {
    return Boom.internal(`Post can't be save\nError: ${error}`);
  }
};

const getAllPosts = async (request, h) => {
  const page = request.query.page ? parseInt(request.query.page) : 1;
  const limit = request.query.limit ? parseInt(request.query.limit) : 5;
  const order = request.query.order ? request.query.order : 'DESC';
  const fieldOrder = { title: order };
  try {
    const results = await pagination(Post, page, limit, fieldOrder, {});
    return h.response(results).code(200);
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

const getPost = async (request, h) => {
  const results = {};
  try {
    results.results = await getRepository(Post).findOne(request.params.id);
    if (!results.results) return Boom.notFound('Post not found');
    return h.response(results).code(200);
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

const updatePost = async (request, h) => {
  const results = {};
  try {
    const post = await getRepository(Post).findOne(request.params.id);
    if (post) {
      if (post.user != request.user) return Boom.forbidden('unauthorized user');
      const newPost = getRepository(Post).merge(post, request.payload);
      results.results = await getRepository(Post).save(newPost);
      return h.response(results).code(202);
    }

    return Boom.notFound('Post not found');
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

const deletePost = async (request, h) => {
  const results = {};
  const post = await getRepository(Post).findOne(request.params.id);
  if (post.user != request.user) return Boom.forbidden('unauthorized user');
  try {
    results.results = await getRepository(Post).delete(request.params.id);
    return h.response(results).code(203);
  } catch (error) {
    return Boom.internal(`Error: ${error}`);
  }
};

export { savePost, getAllPosts, getPost, updatePost, deletePost };
