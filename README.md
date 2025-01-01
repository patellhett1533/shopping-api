
# Run Api on Local

first you will need to set .env in root directory

```
NODE_ENV=development
PROJECT_ID=shopping
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=shoppingsecret
JWT_ACCESS_EXPIRATION_DAYS=1
JWT_REFRESH_EXPIRATION_DAYS=30

```

then run following command

```
npm install
npm run build
npm start:dev

```

* for running api in your local you must have mongodb on local or use atlas link in env.

after successfully running of api, in mongodb a database created which name is test and inside test 3 collections are created products, tokens, users.

