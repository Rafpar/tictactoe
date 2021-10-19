
## Description

Tic Tac Toe Game with usage of rest API

## Installation
1. Download [MongoDB](https://www.mongodb.com/try/download/community), install and connect to
```
mongodb://localhost/tictactoe
```
2. Download [Nodejs](https://nodejs.org/en/) and install
3. Install Nest CLI
```
npm i -g @nestjs/cli
```
4. Install Mongoose a MongoDB modeling tool
```
npm install --save @nestjs/mongoose mongoose
```
5. Install validation library
```
npm i --save class-validator class-transformer
```
6. Install Swagger module
```
npm install --save @nestjs/swagger swagger-ui-express
```
## Running the game

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev


## Test
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Instruction

To play a game use endpoints available here:
[http://localhost:3000/api/](http://localhost:3000/api/)

To display board in browser go to the:
[http://localhost:3000/board](http://localhost:3000/board)

## Author

Rafał Parda


## License

Nest is [MIT licensed](https://choosealicense.com/licenses/mit/).