const postModel = require('../models/post');
//const mongoose = require('mongoose');

//Function to retrieve posts
async function getPosts(req, res){
    const fetchedPosts = await postModel.find();
    //Used to set the status of the HTTP header to OK. An array 'posts' is created
    //based on the contents of the Database which is used to create the title and url in JSON format.
    res.status(200).json({
        posts: fetchedPosts.map((post) => ({
            title: post.content,
            url: post.url,
            likes: post.ups
      }))
    })
}

module.exports = {getPosts};



