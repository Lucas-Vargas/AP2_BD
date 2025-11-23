/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('itens_cardapio', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.decimal('preco').notNullable;
        table.integer('restaurante_id').unsigned();

        table
            .foreign('restaurante_id')
            .references('resturantes.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('itens_cardapio');
};
