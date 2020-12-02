import Post from './model';
import { EntitySchema } from 'typeorm';

const PostSchema = new EntitySchema({
  name: 'Post',
  target: Post,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    text: {
      type: 'text',
    },
    image: {
      type: 'text',
    },
  },
  relations: {
    users: {
      target: 'User',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
    },
  },
});

export default PostSchema;
