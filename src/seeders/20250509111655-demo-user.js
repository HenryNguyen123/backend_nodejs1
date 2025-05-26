'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
     await queryInterface.bulkInsert('Users', [  // <= tên table ==============================
      {
       name: 'John Doe',
       email: 'user1@gmail.com',
       password: '123',
      },
      {
       name: 'John Doe 1111',
       email: 'user11111@gmail.com',
       password: '123',
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
