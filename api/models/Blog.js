/**
 * Blog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema    : true,
  attributes: {
    state        : {type: 'string', enum: ['active', 'inactive'], defaultsTo: 'active'},
    category     : {type: 'string', defaultsTo: 'uncategorized'},
    creator      : {model: 'user'},
    tags         : {type: 'array', defaultsTo: []},
    slug         : {type: 'text', required: true},
    title        : {type: 'text', required: true},
    brief        : {type: 'text'},
    content      : {type: 'text'},
    featuredImage: {model: 'media'}
  }
};

