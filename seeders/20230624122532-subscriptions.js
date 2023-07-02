'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subscriptions', [
      {
        status: 'started',
        UserId: 5,
        CourseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'started',
        UserId: 6,
        CourseId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'complete',
        UserId: 7,
        CourseId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'started',
        UserId: 8,
        CourseId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'complete',
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
