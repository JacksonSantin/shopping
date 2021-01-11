import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('usuario', (table) => {
    table.increments('id_usuario').primary();

    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('usuario').notNullable().unique();
    table.string('senha').notNullable();
    table.string('cpf').unique();
    table.string('rua');
    table.integer('numero');
    table.string('complemento');
    table.string('cidade');
    table.string('bairro');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('usuario');
}
