/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {id: 1, email: 'teste@teste', senha: "$2b$10$28tl8qbKNvV6qLuT/fcv7eme3hVcsJYgRTtHRyMYhYxoVBxXdzT6y"}//senha:)
  ]);
};
