'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductOffer', [
      {
        userId: 1,
        productId: 2,
        offer: 45,
        createdAt: new Date(Date.now() - 5000 * 60 ),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        productId: 2,
        offer: 44,
        createdAt: new Date(Date.now() - 4000 * 60),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        productId: 2,
        offer: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProductOffer', null, {});

  }
};
