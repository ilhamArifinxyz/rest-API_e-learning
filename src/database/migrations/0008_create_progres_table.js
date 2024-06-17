exports.up = async (knex) => {
  await knex.schema.createTable("progres", (table) => {
    table.increments("id_progres").primary();
    table.integer("id_user").unsigned().notNullable();
    table.integer("id_materi").unsigned().notNullable();
    table.boolean("status_progres").notNullable();
    table.foreign("id_user").references("id").inTable("users");
    table.foreign("id_materi").references("id").inTable("materi");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("progres");
};
