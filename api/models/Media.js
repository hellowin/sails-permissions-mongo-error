/**
* Media.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema    : true,
  attributes: {
    state   : {type: 'string', enum: ['active', 'inactive'], defaultsTo: 'active'},
    category: {type: 'string', defaultsTo: 'uncategorized'},
    tags    : {type: 'array', defaultsTo: []},
    creator : {model: 'user'},
    name    : {type: 'string', required: true},
    path    : {type: 'string', required: true},
    filename: {type: 'string', required: true}
  }
};

