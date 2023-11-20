const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, //UID
    content: String, //text content of the post/comment
    url: String, //permalink to the post/comment
    ups: Number, //number of likes. named for parity with post.js
});

const tweetModel = mongoose.model("Tweets", tweetSchema);

module.exports = tweetModel;
