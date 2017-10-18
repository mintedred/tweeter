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
  header.append(userImg).append(name).append(handle);
  tweet.append(header);
  tweet.append(content);
  footer.append(date);
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
  // Display icons when user hovers over a tweet
  $(".tweet").hover(function(){
    $(this).find(".actions").toggle();
  });

    // Fake data taken from tweets.json
  var data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];
  
  renderTweets(data);

});