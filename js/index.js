 'use strict';

var $ = require('jquery')
var tmpl = require('./template.js')

var currentUser = {
  handle: '@blend_software',
  img: '/images/sweet.png',
  id: 4
}

$(function () {
	var usersUrl = 'http://localhost:3000/users/'
	var tweetsUrl = 'http://localhost:3000/tweets/'
	var repliesUrl = 'http://localhost:3000/replies/'

	function getUsers() {
		return $.get(usersUrl)		
	}

    function getReplies(id) {
        return $.get(tweetsUrl + id + '/replies')
    }

    function getAllReplies() {
        return $.get(repliesUrl)
    }
    function getTweets() {
        return $.get(tweetsUrl)
    }

    function tweetsByUser(id) {
        return $.get(usersUrl + id +'/tweets')
    }

    function renderCompose() {
        return tmpl.compose()
    }
    
    var replies = getAllReplies()
    var robots = getUsers()
	var tweeting = getTweets()


	robots.done(function (robots) {
		robots.forEach(function (robot) {
			tweetsByUser(robot.id)
                .done(function (tweets) {
                    tweets.forEach(function (tweet) {
                        $('#tweets').append(renderThread (robot, tweet.message, tweet.id))
                    })
                })
		})
	})
				
	$('#main').on('click', 'textarea', function () {
        $(this).parent().addClass('expand')
    })

    $('#main').on('submit', '.compose', function (event) {
        event.preventDefault()

        var message = $(this).find('textarea').val()
        var replyTweet = $(this).closest('.replies')


        if(!!replyTweet.length) {
          var getTweetId = replyTweet.siblings('.tweet').attr('id')
          var tweetId = getTweetId.slice(6)
          postReply(currentUser, tweetId, message)
        } else {
          postTweet(currentUser, message)  
        }
        $(this).removeClass('expand')
        $(this).find('textarea').val('')
        $(this).find('count').text(140)
    }) 
        
    $('#tweets').on('click', '.tweet', function () {
        $(this).closest('.thread').toggleClass('expand')
        var appendReplies = $(this).parents('#tweets').find('.replies > .tweet')
        if (!appendReplies.length) {
            getAllReplies()
                .done(function (replies) {
                    replies.forEach(function (reply) {
                        robots.done(function (robots) {
                            robots.forEach(function (robot) {
                                if (reply.userId === robot.id) {
                                var html = renderTweet(robot, reply.message, reply.tweetId)
                                var search = $('#tweet-' + reply.tweetId)
                                search.siblings('.replies').append(html)

                                }
                            })
                        })
                    })
              })
          }
    }) 

    function postTweet(user, message) {
        $.post(tweetsUrl, {
            userId: user.id,
            message: message
        }).done(function (post) {
            console.log('good')
 
            $('#tweets').append(renderThread(currentUser, message, post.id))
        }).fail(function () {
            console.log('bad')
        })
    }

    function postReply(user, tweetId, message) {
        $.post(repliesUrl, {
            userId: user.id,
            tweetId: tweetId,
            message: message
        }).done(function (post) {
            console.log('excellent')
            var html = tmpl.thread({
                tweet:renderTweet(user, message)
            })
            var search = $('#tweet-' + tweetId)
            search.siblings('.replies').append(html)
        }).fail(function () {
            console.log('so not good')
        })
    }

    function renderThread(user, message, id) {
    var html = tmpl.thread({
        tweet: renderTweet(user, message, id),
        compose: renderCompose()
    })
    return html
  }

  function renderTweet(user, message, tweetId) {
    var html = tmpl.tweet({
        img: user.img,
        userId: user.id,
        handle: user.handle,
        message: message,
        id: tweetId
    })
    return html
  } 
});

















