const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, //UID
    content: String, //text content of the post/comment
    url: String, //permalink to the post/comment
    ups: Number, //number of upvotes. named for parity with snoowrap
});

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;
