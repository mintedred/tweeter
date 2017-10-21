# Tweeter Project

Tweeter is a simple, responsively-designed single-page Twitter clone.

## Screenshots

!["Desktop view"](https://github.com/mintedred/tweeter/blob/master/documents/tweeter-desktop.png)
!["User warning when over 140 characters"](https://github.com/mintedred/tweeter/blob/master/documents/tweet-warning.png)
!["Icons displayed on hover"](https://github.com/mintedred/tweeter/blob/master/documents/tweet-hover.png)
!["Mobile view"](https://github.com/mintedred/tweeter/blob/master/documents/mobile-view.png)


HTML, SASS/CSS, JS, jQuery and AJAX were used for the front-end, and Node, Express and MongoDB were used for the back-end.

Tweets are displayed in order, from most recent first. The "Flag", "Re-tweet" and "Like" icons appear in the footer when a user hovers over a tweet. When the user clicks on the Compose button, the Compose Tweet box drops down and the textarea is automatically focused. If the tweet is over 140 characters, the Character Counter turns red and an alert pops up when the user tries to submit the tweet. After submission, the Compose Tweet textarea is cleared, and the Character Counter is reset to 140. The submitted tweet instantly appears as the latest tweet, without a whole page refresh. 


## Dependencies

- Express
- Node 5.10.x or above
- Body Parser
- Chance
- MongoDB
- Node Sass Middleware
