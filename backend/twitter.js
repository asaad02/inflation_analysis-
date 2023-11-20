const axios = require("axios");
const tweetModel = require("./models/tweet");
const mongoose = require("mongoose");

const TWITTER_KEY = process.env;    


function fetchTwitterData(numPosts = 15, searchQuery = 'inflation') { // function that makes our API call

    const options = {
        method: 'GET',
        url: 'https://twitter154.p.rapidapi.com/search/search',
        params: {
          query: searchQuery,
          section: 'top',
          min_retweets: '20',
          min_likes: '20',
          limit: numPosts,
          start_date: '2022-01-01',
          language: 'en'
        },
          headers: {
          'X-RapidAPI-Key': TWITTER_KEY,
          'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
        }
      };

    axios.request(options).then(storeTwitterData);

    return 0;

}


function createTwitterPost(tweet){



    const newTweet = new tweetModel({          //create a new post object
        _id: new mongoose.Types.ObjectId(),
        content: tweet.text,
        url: "https://twitter.com/" + tweet.user.username + "/status/" + tweet.tweet_id,
        ups: tweet.favorite_count,
    });


    try {
        newTweet.save().catch((e) => console.log(e)); //attempt to save into our database
    } catch (err) {
        console.error(err.message);
    }

}


function storeTwitterData(posts) { // creates tweet object for each tweet in the list


    for (let i = 0; i < posts.data.results.length; i++) {

        createTwitterPost(posts.data.results[i]);
    
    }

    
}



module.exports = { fetchTwitterData, createTwitterPost, storeTwitterData };
