/**
 * AppController
 *
 * @description :: Server-side logic for managing Apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  main: function (req, res) {
    res.redirect('/app/home');
  },
  home: function (req, res) {
    res.view({
      view: sails.view
    });
  }
};

