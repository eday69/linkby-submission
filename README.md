# linkby-submission

### repo structure

### UI is in `linkby-ui` folder

To run UI, `cd` into `linkby-ui` folder and follow UI's README instrauctions

There are 3 users available:

| Name | email | password |
|---|---|---|
| John Doe | test@mail.com | 123 |
| Peter Smith | peter@mail.com | 123 |
| John Peterson | john@mail.com | 123 |


### Api is in `api` folder

To run Api, `cd` into `api` folder.

First, run the api by `npm run docker:dev`
Second, run migrations: `npx sequelize-cli db:migrate`
Third, run seeding: `npx sequelize-cli db:seed:all`

