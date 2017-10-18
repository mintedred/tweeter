/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const ce = document.createElement.bind(document);

const timeSince = function(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);  
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
}

// Create an article element from the given tweet object
let createTweetElement = function(tweetData) {
  let tweet = $('<article>');
  let header = $(ce('header'));
  let userImg = $(ce('img')).attr('src', tweetData.user.avatars.regular);
  let name = $(ce('p')).addClass('name').text(tweetData.user.name);
  let handle = $(ce('p')).addClass('handle').text(tweetData.user.handle);
  let content = $(ce('p')).addClass('tweet-body').text(tweetData.content.text);
  let footer = $(ce('footer'));
  let date = $(ce('p')).addClass('date').text(timeSince(tweetData.created_at));
  tweet.addClass('tweet');
  header.append(userImg).append(name).append(handle);
  tweet.append(header);
  tweet.append(content);
  footer.append(date);
  tweet.append(footer);

  return tweet;
}

$(document).ready(function(){
  // Display icons when user hovers over a tweet
  $(".tweet").hover(function(){
    $(this).find(".actions").toggle();
  });

// Test / driver code (temporary). Eventually will get this from the server.
let tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

let $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page


});