exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3;')
    .then(() => {
      var users = [{
        id: 1,
        name: 'flea',
        email: 'flea@flea.com',
        password: 'flea'
      }, {
        id: 2,
        name: 'bmiz',
        password: 'bmiz',
        email: 'bmiz@bmiz.com'
      }];
      return knex('user').insert(users);
    })
};
