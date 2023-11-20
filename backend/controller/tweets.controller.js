const tweetModel = require('../models/tweet');

//Function to retrieve posts
async function getTweets(req, res){
    const fetchedTweets = await tweetModel.find();
    //Used to set the status of the HTTP header to OK. An array 'posts' is created
    //based on the contents of the Database which is used to create the title and url in JSON format.
    res.status(200).json({
        tweets: fetchedTweets.map((tweet) => ({
            title: tweet.content,
            url: tweet.url,
            likes: tweet.ups,
      }))
    })
}

module.exports = {getTweets};



