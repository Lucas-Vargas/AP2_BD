/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('itens_cardapio').del()
  await knex('itens_cardapio').insert([
    {nome: 'item1', descricao: 'item1 do restaurante 1', preco: 20.00, restaurante_id: 1},
    {nome: 'item2', descricao: 'item2 do restaurante 1', preco: 300.00, restaurante_id: 1},
    {nome: 'item3', descricao: 'item1 do restaurante 2', preco: 300.00, restaurante_id: 2},
  ]);
};
