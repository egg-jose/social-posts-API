import * as Path from 'path';

import Hapi from '@hapi/hapi';
import hapiAuthJWT from 'hapi-auth-jwt2';
import * as inert from '@hapi/inert';
import auth from './middlewares/auth.js';

import { createConnection } from 'typeorm';
import databaseConfig from './config/database';

import env from './config/environment.js';

import userRoutes from './components/users/routes.js';
import postRoutes from './components/posts/routes.js';

import createDefaultUser from './utils/createDefaultUser';

const init = async () => {
  await createConnection(databaseConfig.dev);
  createDefaultUser();
  const server = new Hapi.server({
    port: env.port,
  });
  await server.register(inert);
  await server.register(hapiAuthJWT);
  server.auth.strategy('jwt', 'jwt', {
    key: env.tokenSecret,
    validate: auth,
    verifyOptions: { ignoreExpiration: true },
  });

  server.route({
    method: 'GET',
    path: '/images/{filename}',
    config: { auth: false },
    handler: function (request, h) {
      const path = Path.join(__dirname, '../public/images').replace(
        /\\/gi,
        '/'
      );
      return h.file(`${path}/${request.params.filename}`, { confine: false });
    },
  });

  server.route(userRoutes);
  server.route(postRoutes);

  await server.start();
  return server;
};

init()
  .then(server => {
    console.log('Server running at:', server.info.uri);
  })
  .catch(err => {
    console.log(err);
  });
