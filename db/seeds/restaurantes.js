/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('restaurantes').del()
  await knex('restaurantes').insert([
    {nome: 'teste1', tipo_cozinha: 'teste'},
    {nome: 'teste2', tipo_cozinha: 'teste'},
  ]);
};
