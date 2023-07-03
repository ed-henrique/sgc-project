'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subscriptions', [
      {
        status: 8,
        UserId: 5,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 2,
        UserId: 6,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 3,
        UserId: 7,
        CourseId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 9,
        UserId: 8,
        CourseId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 1,
        UserId: 9,
        CourseId: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
