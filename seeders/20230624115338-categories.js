'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Business and Entrepreneurship',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Technology and Programming',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arts and Design',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Language and Communication',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Personal Development and Self-Improvement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Health and Fitness',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Science and Mathematics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Social Sciences and Humanities',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Finance and Accounting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marketing and Advertising',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leadership and Management',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Writing and Journalism',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Engineering and Architecture',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Environmental Studies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'History and Culture',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
