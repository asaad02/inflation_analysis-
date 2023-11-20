var snooWrap = require('snoowrap');
const postModel = require("./models/post");
const mongoose = require("mongoose");


const { CLIENT_ID, REDDIT_SECRET, REFRESH_TOKEN } = process.env;    


const r = new snooWrap({
    userAgent: 'school project that collates posts about inflation',
    clientId: CLIENT_ID,
    clientSecret: REDDIT_SECRET,
    refreshToken: REFRESH_TOKEN
});


function fetchRedditData(numPosts = 25, timeWindow = 'year') { // helper function that makes our API call

    // Proof of concept API call. This line queries all subreddits for the top 5 posts related to inflation
    var list = r.getSubreddit('all').search({query: 'inflation', sort: timeWindow, limit: numPosts}).then(storeRedditData)  
    // Once the async promise is fulfilled, a list of posts is processed and added to the database

    return list;

}


function createRedditPost(post) { // creates reddit post object, adds to database

    const newPost = new postModel({          //create a new post object
        _id: new mongoose.Types.ObjectId(),
        content: post.title,
        url: 'https://www.reddit.com' + post.permalink,
        ups: post.ups,
    });


  try {
          newPost.save().catch((e) => console.log(e)); //attempt to save into our database
          console.log("Successfully added post to db.")
          return 1;
      } catch (err) {
          console.error(err.message);
          console.log("Failed to save post.")
          return -1;
      }

}


function storeRedditData(posts, sortMode = "yes") { // creates post for each reddit post in the list

    sortByUpvotes(posts, sortMode);  // will sort by upvotes (descending order) by default

    for (let i = 0; i < posts.length; i++) {

        createRedditPost(posts[i]);
    
    }

}


function sortByUpvotes(posts, sortMode = "yes") { // takes list of Submission objects. Mutates the original array

    if(sortMode == "yes" || sortMode == "descending") { // sort by descending order. default functionality
        posts.sort((a, b) => ((b.ups - a.ups)))
    }
    else if(sortMode == "reverse" || sortMode == "ascending") { // sort by ascending order
        posts.sort((a, b) => ((a.ups - b.ups)))
    }

}


module.exports = { fetchRedditData, createRedditPost, storeRedditData, sortByUpvotes };
