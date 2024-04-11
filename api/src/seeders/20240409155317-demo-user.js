'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
      {
         email: 'test@mail.com',
         name: 'John Doe',
         password: '123',
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         email: 'peter@mail.com',
         name: 'Peter Smith',
         password: '123',
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         email: 'john@mail.com',
         name: 'John Peterson',
         password: '123',
         createdAt: new Date(),
         updatedAt: new Date(),
       },
     ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
