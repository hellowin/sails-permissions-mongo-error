var nodemailer = require('nodemailer'),
    request    = require('request'),
    fs         = require('fs'),
    ejs        = require('ejs');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Mandrill',
  auth   : {
    user: 'andi.n.dirgantara@gmail.com',
    pass: 'HpmwY-eWtLpo9liCTlB8gw'
  }
});

var template = fs.readFileSync('assets/templates/email/template.ejs', 'ascii');

var mail = {
  sendVerification: function (id) {
    User
      .findOne({id: id})
      .exec(function (err, user) {
        var text = format('Please verify your account. Click/ follow this link: %s/user/verify/%s/%s', 'http://dev.cannesstore.com', user.id, user.verification);
        var opt  = {
          from   : 'Cannes Store <admin@cannesstore.com>',
          to     : user.email,
          subject: 'Account Verification',
          text   : text,
          html   : ejs.render(template, {text: text})
        };

        transporter.sendMail(opt, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(format('someone has registered with email: %s', user.email));
          }
        });
      });
  },
  sendPassword    : function (email, password) {
    User
      .findOne({email: email})
      .exec(function (err, user) {
        var text = format('Your password has been reset to: %s', password);
        var opt  = {
          from   : 'Cannes Store <admin@cannesstore.com>',
          to     : user.email,
          subject: 'Password Reset',
          text   : text,
          html   : ejs.render(template, {text: text})
        };

        transporter.sendMail(opt, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(format('someone has reset his password: %s', user.email));
          }
        });
      });
  }
};

module.exports = mail;
