import env from './environment';

import User from '../components/users/entity';
import Post from '../components/posts/entity';

const typeormConfig = {
  dev: {
    type: 'postgres',
    host: env.databaseHost,
    port: env.databasePort,
    username: env.databaseUser,
    password: env.databasePassword,
    database: env.databaseName,
    synchronize: true,
    logging: false,
    entities: [User, Post],
  },
  test: {
    type: 'postgres',
    host: env.databaseHost,
    port: env.databasePort,
    username: env.databaseUser,
    password: env.databasePassword,
    database: env.databaseNameTest,
    synchronize: true,
    logging: false,
    entities: [User, Post],
    dropSchema: true,
  },
};

export default typeormConfig;
