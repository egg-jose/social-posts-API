import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import User from '../components/users/model.js';
import Boom from '@hapi/boom';

import env from '../config/environment';

export default async () => {
  const userRepository = getRepository(User);
  const adminsUsers = await userRepository.find({ admin: true });

  if (adminsUsers.length == 0) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(env.userPassword, salt);

      const newUser = userRepository.create(
        new User(env.userName, env.userEmail, hashPassword, true)
      );
      const result = await userRepository.save(newUser);
      if (result) console.log('Admin user created');
    } catch (error) {
      throw Boom.internal('Internal error');
    }
  }
};
