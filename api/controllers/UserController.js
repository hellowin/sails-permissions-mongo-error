/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * req = {
   *   oldPassword: 'string',
   *   newPassword: 'string'
   * }
   * @param req
   * @param res
   */
  update_password: function (req, res) {
    var id          = req.user.id,
        oldPassword = req.param('old_password'),
        newPassword = req.param('new_password');

    if (!oldPassword) return res.badRequest('please provide \'old_password\' parameter');
    if (!newPassword) return res.badRequest('please provide \'new_password\' parameter');

    Passport
      .findOne({user: id, protocol: 'local'})
      .exec(function (err, rec) {
        rec.validatePassword(oldPassword, function (err, pass) {
          if (err) return res.forbidden(err);

          if (!pass) return res.badRequest('your \'old_password\' did not match');

          Passport
            .update({user: id}, {password: newPassword}, function (err, rec) {
              if (err) return res.badRequest(err);

              res.json({
                msg: 'your password was updated'
              });
            });
        });
      });
  },
  /**
   * req = {
   *   email: 'email'
   * }
   * @param req
   * @param res
   */
  reset_password : function (req, res) {
    var email = req.param('email');

    User
      .findOne({email: email})
      .exec(function (err, user) {
        if (err) return res.badRequest(err);

        Passport
          .findOne({user: user.id, protocol: 'local'})
          .exec(function (err, passport) {
            if (err) return res.badRequest(err);

            var newPassword   = (Math.round((Math.random() + 1) * 99999999) + '').slice(1);
            passport.password = newPassword;
            passport.save(function (err, rec) {
              if (err) return res.badRequest(err);

              MailService.sendPassword(email, newPassword);

              res.ok('password has ben reset, check your email');
            });
          });
      });
  },
  verify         : function (req, res) {
    var id   = req.param('id'),
        code = req.param('code');

    User
      .findOne({id: id})
      .exec(function (err, user) {
        if (err) return res.badRequest(err);

        if (user.status === 'verified') return res.badRequest('already verified');

        if (user.verification === code) {

          var data    = user;
          data.status = 'verified';
          data.save(function (err, saved) {
            if (err) return res.badRequest(err);

            res.json(saved);
          });

        } else {
          return res.badRequest('wrong code');
        }

      });
  },
  _config        : {shortcuts: false}
};

