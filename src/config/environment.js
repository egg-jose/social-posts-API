import dotnet from 'dotenv';
dotnet.config();

const env = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  databaseName: process.env.DATABASE_NAME,
  databaseNameTest: process.env.DATABASE_NAME_TEST,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  port: process.env.PORT,
  tokenSecret: process.env.TOKEN_SECRET,
  userName: process.env.USER,
  userEmail: process.env.EMAIL,
  userPassword: process.env.PASSWORD,
};

export default env;
