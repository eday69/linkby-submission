# linkby-submission

### repo structure

### UI is in `linkby-ui` folder

To run UI, `cd` into `linkby-ui` folder and follow UI's README instrauctions 

### Api is in `api` folder

To run Api, `cd` into `api` folder.
Need to run migrations: `npx sequelize-cli db:migrate`

Projects includes some seeding (which are optional), to run do `npx sequelize-cli db:seed:all`

Now you can run the api by `npm run docker:dev` 
