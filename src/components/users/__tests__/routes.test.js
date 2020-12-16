import { start } from '../../../server';
import env from '../../../config/environment';

test('simple', () => {
  expect(true).toBe(true);
});

describe('Users POST /users', () => {
  let server;

  beforeAll(async () => {
    server = await start();
  });

  afterAll(async () => {
    await server.close();
    await server.stop();
  });

  test('responds with 401 Missing authentication', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/users',
      payload: {
        name: 'test',
        email: 'testing@email.com',
        password: 'password',
      },
    });
    expect(res.statusCode).toBe(401);
  });

  test('responds with 400 bad request ', async () => {
    const jsonwebtoken = await server.inject({
      method: 'post',
      url: '/login',
      payload: {
        email: env.userEmail,
        password: env.userPassword,
      },
    });
    expect(jsonwebtoken.statusCode).toBe(200);
    const res = await server.inject({
      headers: {
        Authorization: jsonwebtoken.result,
      },
      method: 'post',
      url: '/users',
      payload: {
        name: 'test',
        email: 'admin@email.com',
        password: 'password',
      },
    });
    expect(res.statusCode).toBe(400);
  });

  test('responds with 200 user created and deleted', async () => {
    const jsonwebtoken = await server.inject({
      method: 'post',
      url: '/login',
      payload: {
        email: env.userEmail,
        password: env.userPassword,
      },
    });
    expect(jsonwebtoken.statusCode).toBe(200);
    const res = await server.inject({
      headers: {
        Authorization: jsonwebtoken.result,
      },
      method: 'post',
      url: '/users',
      payload: {
        name: 'test',
        email: 'testing@email.com',
        password: 'password',
      },
    });
    expect(res.statusCode).toBe(200);

    const deleteUser = await server.inject({
      headers: {
        Authorization: jsonwebtoken.result,
      },
      method: 'delete',
      url: `/users/${res.result.results.id}`,
    });
    expect(deleteUser.statusCode).toBe(202);
  });
});
