 'use strict';

var $ = require('jquery')
var tmpl = require('./template.js')


var currentUser = {
  handle: '@bradwestfall',
  img: 'brad.png',
  id: 1
}

$(function () {

	var usersUrl = 'http://localhost:3000/users/'
	var tweetsUrl = 'http://localhost:3000/tweets/'
	var repliesUrl = 'http://localhost:3000/replies/'

	function getUsers () {
		// console.log(tmpl)
		return $.get(usersUrl)
			// .done(function (getUsersFromUrl) {
			// 	console.log(getUsersFromUrl)
			// })
	}
	
	// $get(usersUrl + id)
	// 	.done(function (userid) {
	// 		$.get(userid + )
	// 	})

	getUsers()
		.done(function (arrayOfUsers) {
			arrayOfUsers.forEach(function (user) {
				// console.log(tmpl.tweet({
				// 	handle: user.handle,
				// 	img: user.img,
				// 	message: user.realName
				// }))
				getTweets(user.id)
					.done(function (tweets) {
						tweets.forEach(function (tweet) {		
							// console.log(tmpl.tweet({
							// 	id: tweet.id,
							// 	userId: tweet.userId,
							// 	message: tweet.message
							// }))
						})
						// console.log('tweets per user', tweets)
					})
				getReplies(tweets.id)
					.done(function (replies) {
						replies.forEach(function (reply) {
							console.log(tmpl.tweet({
								repliesId: reply.id
							}))
						})
					})	
			})
		})


	function getReplies(id) {
		return $.get(tweetsUrl + id + '/replies')
		// .done(function (getRepliesFromTweetsUrl) {
		// console.log(tweetsUrl + id + '/replies')
			
		})
	}	
		
	function getTweets(id) {
		// console.log (1)
		return $.get(usersUrl + id + '/tweets')
			// .done(function (getTweetsFromUrl) {
			// 	console.log(getTweetsFromUrl)
			// })
	}
	
	
})

































// 'use strict';

// var $ = require('jquery')
// var tmpl = require('./template.js')
// var userUrl = 'http://localhost:3000/users/'
// var tweetsUrl = 'http://localhost:3000/tweets/'
// var repliesUrl = 'http://localhost:3000/replies/'

// var currentUser = {
//   handle: '@bradwestfall',
//   img: 'brad.png',
//   id: 1
// }

// function getUsers() {
// 	return $.get(userUrl)
// }

// function getUserTweets(users) {
// 	users.forEach(function (user) {
// 		console.log('user data', users)
// 		$('#tweets').append()
// 		$.get(userUrl + user.id + '/tweets')
// 			.done(function (tweets) {
// 				console.log('tweets for user' + user.id, tweets)
// 			})
// 			.fail(function (xhr) {
// 				console.log(xhr.status, 'fail for user' + user.id)
// 			})
// 	})
// }

// getUsers()
// 	.done(getUserTweets)
// 	.fail(function (xhr) {
// 		console.log('user request failed', xhr.status)		
// 	})




// $(function () {

// 	   //expands the text area for composing a new tweet
// 	$('#main').on('click', 'textarea', function () {
// 		$(this).parent().addClass('expand')
// 		// console.log('hi')
// 		// event.preventDefault()
// 	})	
// 	// toggles the thread but not the tweet
// 	$('body').on('click', '.thread > .tweet', function () {
// 		$(this).parent().toggleClass('expand')
// 		// console.log('hey')
// 		// event.preventDefault()	
// 	})

// 		$('textarea').val('')
// 		$(this).removeClass('expand')
// 		event.preventDefault()


// 	// $('#main').on('submit', 'form', function() {
// 	// 	var message = $(this).find('textarea').val()
// 	// 	// event.preventDefault()
// 	// 	if($(this).parents('.replies').length) {
// 	// 	   $(this).parents('.replies').append(renderTweet(User, message))
// 	// 	} else {
// 	// 		$('.tweets').append(renderThread(User, message))
// 	// 	}

// 	// })
// })