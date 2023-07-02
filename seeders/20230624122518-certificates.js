'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Certificates', [
      {
        code: 'test',
        UserId: 7,
        CourseId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'test2',
        UserId: 9,
        CourseId: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Certificates', null, {});
  }
};
