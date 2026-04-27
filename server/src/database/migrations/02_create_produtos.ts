import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('produtos', (table) => {
    table.increments('id_produto').primary();

    table.string('nome').notNullable();
    table.integer('quantidade').notNullable();
    table.float('valor_unitario').notNullable();
    table.float('total').notNullable();
    table.boolean('comprado').defaultTo(false);

    table
      .integer('id_estabelecimento')
      .references('estabelecimento.id_estabelecimento')
      .notNullable();

    table.integer('id_usuario').references('usuarios.id_usuario').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('produtos');
}
