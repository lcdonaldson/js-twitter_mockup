'use strict';

var handlebars = require('hbsfy/runtime')

var compose = require('../templates/composeTemplate.handlebars')

var tweet = require('../templates/tweetTemplate.handlebars')

var thread = require('../templates/threadTemplate.handlebars')

module.exports = {
	compose: compose,
	tweet: tweet,
	thread: thread
}