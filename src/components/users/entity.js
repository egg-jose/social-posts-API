import User from './model';
import { EntitySchema } from 'typeorm';

const UserSchema = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    admin: {
      type: 'boolean',
    },
  },
  relations: {
    posts: {
      target: 'Post',
      type: 'one-to-many',
      joinTable: true,
      cascade: true,
    },
  },
});

export default UserSchema;
