exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('description');
    table.text('type').notNullable();
    table.text('ingredients').notNullable();
    table.text('prep_time');
    table.text('cook_time');
    table.integer('rating');
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipe');
};
