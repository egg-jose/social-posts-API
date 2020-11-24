# Social Posts API
API posts  - practice node js hapi.js structure by components

# Description
API that simulates a social media

## Used technology
- nodejs
- hapi.js
- joi
- prettier
- eslint
- husky
- Json Web Token
- bcryptjs
- Babel
- CircleCI
- JsDocs

## Requirements
- Install Nodejs
- install postgres
## Download & Build on local

## From github
### Clone the repository, install node packages  and verify routes locally

```
//on local
git clone https://github.com/zowe/sample-node-api
cd sample-node-api
npm install
npm start
```
### Note: once the repository has been downloaded, a `.env` file must be added to the project's base path that has the following environment variables:
- DATABASE_NAME
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_HOST
- DATABASE_PORT
- PORT
- TOKEN_SECRET
Example:
```
DATABASE_NAME = typeormtest
DATABASE_USER = typeormtest
DATABASE_PASSWORD = password
DATABASE_HOST = localhost
DATABASE_PORT = 5432
PORT = 3000
TOKEN_SECRET = randomCharaters123456
```

To get a response from any of the http resquests, you must do a single post with the registration and login addresses:
`https: // localhost: 3000 / register` post
`https: // localhost: 3000 / login` post

# Query params
- page : indicate the page you want to present, by default 1. write a number
- limit: indicate the limit of results per page, by default 5. write a number
- order: Indicate the order according to the name of the models, ascending or descending, by default ascending. Write asc | desc

Users registered as admin can access the creation, update and deletion of API resources while others can only view it

Open your local browser and try accessing
`https://localhost:3000/user/` get, post
`https://localhost:3000/user/:id`get, put, delete
`https://localhost:3000/post/` get, post
`https://localhost:18000/post/:id`get, put, delete

