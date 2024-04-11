# linkby-api

Using nodeJS, express, sequelize, postgres

Important:
- Unit test's are not built yet.
- Build not tested

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run docker:dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Sequelize commands

### Create new model
```sh
npx sequelize-cli model:generate --name User --attributes email:string,password:string
```

### Run migrations
```sh
npx sequelize-cli db:migrate
```

### Create new seed
```sh
npx sequelize-cli seed:generate --name demo-user
```

### Run seeds
```sh
npx sequelize-cli db:seed:all
```
