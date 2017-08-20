exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_recipe', (table) => {
    table.increments();
    table.integer('user_id').references('user.id').onDelete('cascade');
    table.integer('recipe_id').references('recipe.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_recipe');
};
