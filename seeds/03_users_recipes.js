exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "user_recipe"; ALTER SEQUENCE user_recipe_id_seq RESTART WITH 3;')
    .then(() => {
      var user_recipes = [{
        id: 1,
        user_id: 1,
        recipe_id: 2
      }, {
        id: 2,
        user_id: 2,
        recipe_id: 1
      }];
      return knex('user_recipe').insert(user_recipes);
    })
};
