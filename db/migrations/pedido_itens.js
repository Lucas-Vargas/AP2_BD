/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pedido_itens', (table) => {
        table.increments('id').primary();
        table.integer('quantidade').notNullable();
        table.decimal('preco_unitario').notNullable();

        //FK
        table.integer('pedido_id').unsigned;
        table.integer('item_id').unsigned();

        table.foreign('pedido_id').references('pedidos.id');
        table.foreign('item_id').references('itens_cardapio.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pedido_itens');
};
