/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function parseHumanDate(timeCreated) {
  const created = new Date(timeCreated)
  const seconds = Math.floor((Date.now() - created) / 1000)

  let secondsArray = [
      [31536000, ' year'],
      [2592000, ' month'],
      [86400, ' day'],
      [3600, ' hour'],
      [60, ' minute'],
      [1, ' second']
  ]

  function parseHumanDateRecursive(seconds, secondsArray) {
      if (seconds === 0) return 'Just now'

      let dateWord = ''
      const head = secondsArray.shift()
      const interval = Math.floor(seconds / head[0])

      if (interval >= 1) {
          interval === 1 ? dateWord = head[1] : dateWord = head[1] + 's'
          return '~ ' + interval + dateWord + ' ago'
      } else {
          return parseHumanDateRecursive(seconds, secondsArray)
      }
  }

  return parseHumanDateRecursive(seconds, secondsArray)
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
  const date = $(ce('p')).addClass('date').text(parseHumanDate(tweetData.created_at));
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
  for (let i = tweets.length - 1; i >= 0; i--) {
    $('#tweets-container').append(createTweetElement(tweets[i]));
  }
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
      $.post('/tweets', {'text': submitTweet})
       .done(
        $.ajax({
          url: '/tweets',
          method: 'GET',
          success: function (data) {
            $('#tweets-container').prepend(createTweetElement(data[data.length - 1]));
          }
        })
      );
      $(this).parent().trigger('reset'); 
      $(this).siblings('.counter').text('140');
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

  // Display Compose Tweet box when user clicks Compose
  $(".compose").click(function(){
    $(this).toggleClass('compose-click');
    $(this).parent().next().find(".new-tweet").slideToggle();
    $(this).parent().next().find("textarea").focus();
  });  


  // Display icons when user hovers over a tweet
  // Attach handler to the parent object that does not get loaded dynamically
  $('#tweets-container').on("mouseover", ".tweet", function(){
    $(this).find(".actions").toggle();
  });
  $('#tweets-container').on("mouseout", ".tweet", function(){
    $(this).find(".actions").toggle();
  });
  // $(".tweet").hover(function(){
  //   console.log('this');
  //   $(this).find(".actions").toggle();
  // });

});