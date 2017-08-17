exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "recipe"; ALTER SEQUENCE recipe_id_seq RESTART WITH 3;')
    .then(() => {
      var recipes = [{
        id: 1,
        title: 'red chile',
        description: 'best red chile ever',
        type: 'New Mexican',
        ingredients: 'red chile pods, garlic, flour',
        prep_time: '20 min',
        cook_time: '20 min',
        rating: 9,
      }, {
        id: 2,
        title: 'cauliflower mash',
        description: 'sooo good',
        type: 'American',
        ingredients: 'cauliflower, garlic',
        prep_time: '20 min',
        cook_time: '30 min',
        rating: 8
      }];
      return knex('recipe').insert(recipes)
    })
};
