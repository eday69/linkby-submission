'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        ownerId: 1,
        name: 'Ventilator',
        description: '19" wide almost new desk ventilator in great condition',
        price: 80,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 2,
        name: 'Running shoes',
        description: 'Flying shoes to make you run faster',
        price: 50,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 1,
        name: 'Speaker set',
        description: 'Two speaker that make you tremble',
        price: 180,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 3,
        name: 'Pens',
        description: 'Remember: the pen is mightier than the sword',
        price: 10,
        status: 'Available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
