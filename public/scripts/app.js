/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const timeSince = function(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);  
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
}

// Create an article element from the given tweet object
const createTweetElement = function(tweetData) {
  const ce = document.createElement.bind(document);
  const tweet = $('<article>').addClass('tweet');
  const header = $(ce('header'));
  const userImg = $(ce('img')).attr('src', tweetData.user.avatars.regular);
  const name = $(ce('p')).addClass('name').text(tweetData.user.name);
  const handle = $(ce('p')).addClass('handle').text(tweetData.user.handle);
  const content = $(ce('p')).addClass('tweet-body').text(tweetData.content.text);
  const footer = $(ce('footer'));
  const date = $(ce('p')).addClass('date').text(timeSince(tweetData.created_at));
  const actions = $(ce('div')).addClass('actions');
  const flag = $(ce('img')).attr('src', '/images/flag.png');
  const like = $(ce('img')).attr('src', '/images/like.png');
  const retweet = $(ce('img')).attr('src', '/images/retweet.png');
  header.append(userImg).append(name).append(handle);
  tweet.append(header);
  tweet.append(content);
  footer.append(date);
  actions.append(flag).append(like).append(retweet);
  footer.append(actions);
  tweet.append(footer);
  return tweet;
}

// Loop through array of tweets and append to container
const renderTweets = function(tweets) {
  tweets.forEach(function(tweet) {
    const addTweet = $('#tweets-container').append(createTweetElement(tweet));
    return addTweet;
  });
}


$(document).ready(function() {
  
  // Use event handlers to submit form data using Ajax
  let $button = $('.new-tweet input[type="submit"');
  $button.on('click', function (e) {
    e.preventDefault();
    const submitTweet = $(this).prev().val(); 
    
    if (submitTweet === "" || null) {
      alert('Please enter a message');
    } else if (submitTweet.length > 140) {
      alert('Your tweet is too long!'); 
    } else {
      console.log('Button clicked, performing Ajax call...');
      $.ajax({
        type: "POST",
        data: {"text" : submitTweet},
        url: '/tweets',
        success: function (data) {
          console.log('Success: ', data );
        }
      });
    }
  });

  //Fetch tweets from the /tweets page
  const loadTweets = function(){
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    })
  }
  loadTweets();


  // Display icons when user hovers over a tweet
  $(".tweet").hover(function(){
    $(this).find(".actions").toggle();
  });

});