const { timeStamp } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pedidos', (table) => {
        table.increments('id').primary();
        table.string('status').notNullable();
        table.decimal('valor_total').notNullable;
        //FK
        table.integer('usuario_id').unsigned();
        table.integer('restaurante_id').unsigned();

        table.foreign('restaurante_id').references('resturantes.id');
        table.foreign('usuario_id').references('usuarios.id');

        table.timestamps(true,true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('pedidos');
};
