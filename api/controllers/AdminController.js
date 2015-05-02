/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  main     : function (req, res) {
    res.redirect('/admin/dashboard');
  },
  dashboard: function (req, res) {
    res.view();
  }
};

