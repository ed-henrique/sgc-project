'use strict';
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const buffer = await fs.promises.readFile(path.join(__dirname, '..', 'public', 'images', 'stock_pfp.jpg'));

    await queryInterface.bulkInsert('Users', [
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'root',
        status: 'active',
        password: bcrypt.hashSync('password123', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'admin',
        status: 'active',
        password: bcrypt.hashSync('password456', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        role: 'admin',
        status: 'active',
        password: bcrypt.hashSync('password789', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'admin',
        status: 'active',
        password: bcrypt.hashSync('passwordabc', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Alex Brown',
        email: 'alex.brown@example.com',
        role: 'student',
        status: 'active',
        password: bcrypt.hashSync('passworddef', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        role: 'student',
        status: 'active',
        password: bcrypt.hashSync('passwordeg1', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Daniel Taylor',
        email: 'daniel.taylor@example.com',
        role: 'student',
        status: 'suspended',
        password: bcrypt.hashSync('passwordeg2', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Olivia Anderson',
        email: 'olivia.anderson@example.com',
        role: 'student',
        status: 'active',
        password: bcrypt.hashSync('passwordeg3', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'William Martinez',
        email: 'william.martinez@example.com',
        role: 'student',
        status: 'active',
        password: bcrypt.hashSync('passwordeg4', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: buffer,
        imageMimeType: "image/jpg",
        name: 'Sophia Lewis',
        email: 'sophia.lewis@example.com',
        role: 'student',
        status: 'suspended',
        password: bcrypt.hashSync('passwordeg5', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
