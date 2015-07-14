'use strict';

var currentUser = {
  handle: '@bradwestfall',
  img: 'brad.png',
  id: 1
};

var $ = require('jquery')
var tmpl = require('./template.js')

$(function () {

	   //expands the text area for composing a new tweet
	$('main').on('click', 'textarea', function () {
		$(this).parent().addClass('expand')
		// console.log('hi')
		// event.preventDefault()
	})	
	// toggles the thread but not the tweet
	$('body').on('click', '.thread > .tweet', function () {
		$(this).parent().toggleClass('expand')
		// console.log('hey')
		// event.preventDefault()	
	})

	$('main').on('submit', 'form', function() {
		var message = $(this).find('textarea').val()
		// event.preventDefault()
		if($(this).parents('.replies').length) {
		   $(this).parents('.replies').append(renderTweet(User, message))
		} else {
			$('.tweets').append(renderThread(User, message))
		}
		$('textarea').val('')
		$(this).removeClass('expand')
		event.preventDefault()

	})
})