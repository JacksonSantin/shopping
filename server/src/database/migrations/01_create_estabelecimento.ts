import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('estabelecimento', (table) => {
    table.increments('id_estabelecimento').primary();

    table.string('nome').notNullable();
    table.decimal('rua').notNullable();
    table.integer('numero');
    table.decimal('complemento');
    table.decimal('cidade').notNullable();
    table.decimal('bairro').notNullable();

    table.integer('id_usuario').references('usuarios.id_usuario').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('estabelecimento');
}
