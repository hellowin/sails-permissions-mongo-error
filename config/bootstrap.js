/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
  sails.services.passport.loadStrategies();

  User.findOrCreate(
    {username: 'hellowin', email: 'andi.n.dirgantara@gmail.com'},
    {username: 'hellowin', email: 'andi.n.dirgantara@gmail.com'},
    function (err, found) {
      Passport.findOrCreate(
        {user: found.id, protocol: 'local'},
        {user: found.id, protocol: 'local', password: 'mp250909'},
        function (err, passport) {
          sails.log.info('bootstraped with \'hellowin\' username');
        });
    });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
