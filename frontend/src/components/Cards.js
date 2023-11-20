import React from 'react';
import { useState, useEffect } from 'react';
import './Cards.css';
import { getPosts, getTweets } from '../utils/api';



// Cards display posts queried from database
const Cards = ({ maxPosts, postSize, fadeStatus, redditOn, twitterOn }) => {
  const maxChars = 100;
  const redditImage = './reddit-on.png';
  const twitterImage = './twitter-on.png';

  const [combinedPosts, setCombinedPosts] = useState([]);

  // Uses the useEffect hook to store posts and tweets as arrays
  useEffect(() => {
    Promise.all([getPosts(), getTweets()]).then(([allPosts, allTweets]) => {
      // Combine all posts and tweets together, tagging each with their origin
      const combined = allPosts.map((post) => ({ ...post, origin: 'Reddit' })).concat(allTweets.map((tweet) => ({ ...tweet, origin: 'Twitter' })));
      setCombinedPosts(combined);
    });
  }, []);
 
  
  // Filter posts based on feed switcher
  const filteredPosts = combinedPosts.filter((post) => {
    if (redditOn && twitterOn) {
      return true;
    } else if (redditOn) {
      return post.origin === 'Reddit';
    } else if (twitterOn) {
      return post.origin === 'Twitter';
    } else {
      return false;
    }
  }).sort((a, b) => b.likes - a.likes);


  return (
    <div key={`${redditOn}-${twitterOn}`} className={`card-container ${postSize}`}>
      {filteredPosts.slice(0, maxPosts).map((post, index) => (
        <div key={post.url} className={`card ${postSize} ${fadeStatus ? 'fade-out' : 'fade-in'}`}>
          <div className={`banner ${post.origin === 'Reddit' ? 'red' : ''}`}></div>
          <img src={post.origin === 'Reddit' ? redditImage : twitterImage} alt='Icon'></img>
          <a href={post.url}>{post.title.substring(0, maxChars)}{post.title.length > maxChars ? '...' : ''}</a>
          <p>{post.origin === 'Reddit' ? '↑' : '♥'} {post.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
