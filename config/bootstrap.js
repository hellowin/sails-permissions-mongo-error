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

var dust = require('dustjs-linkedin');

module.exports.bootstrap = function (cb) {
  sails.services.passport.loadStrategies();

  dust.helpers.exec = function (chunk, context, bodies, params) {
    var args   = JSON.parse(params.args.replace(/'/g, '"'));
    var object = context.stack.head;

    params.func.split('.').some(function (property) {
      if (typeof(object[property]) === "function") {
        var result = object[property].apply(object, args);
        chunk.write(result);
        return true;
      } else {
        object = object[property];
        return false;
      }
    });

    return chunk;
  };

  dust.helpers.i18n = function (chunk, context, bodies, params) {
    var object = context.stack.head;

    if (bodies.block) {
      return chunk.capture(bodies.block, context, function (string, chunk) {
        var words  = string.split(' ');
        var result = '';
        _.each(words, function (word) {
          result = result + sails.__(word) + ' ';
        });
        result     = result.trim();
        chunk.end(result);
      });
    }

    return chunk;
  };

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
