"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweeter').insertOne(newTweet, (err, res) => {
        if (err) throw err
        callback(null, true);          
      })
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweeter').find({})
                             .sort({'created_at': 1})
                             .toArray((err, tweets) => {
        if (err) throw err;
        callback(null, tweets);
      });
    }

  };
}
