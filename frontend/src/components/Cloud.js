import './Cloud.css';
import ReactWordcloud from 'react-wordcloud';
import { calculateFrequencies } from "../utils/frequency";
import React from "react";
import { useState, useEffect } from "react";
import { getPosts, getTweets } from "../utils/api";


const Cloud = ({ maxPosts, redditOn, twitterOn, fadeStatus }) => {
    const [combinedPosts, setCombinedPosts] = useState([]);
 
    // Uses the useEffect hook to store posts and tweets as arrays
    useEffect(() => {
        Promise.all([getPosts(), getTweets()]).then(([allPosts, allTweets]) => {
      // Combine all posts and tweets together, tagging each with their origin
        const combined = allPosts.map((post) => ({ ...post, origin: "Reddit" })).concat(allTweets.map((tweet) => ({ ...tweet, origin: "Twitter" })));
        setCombinedPosts(combined);
        });
    }, []);
 
  
     // Filter posts based on feed switcher
    const filteredPosts = combinedPosts.filter((post) => {
        if (redditOn && twitterOn) {
            return true;
        } else if (redditOn) {
            return post.origin === "Reddit";
        } else if (twitterOn) {
            return post.origin === "Twitter";
        } else {
            return false;
        }
    }).sort((a, b) => b.likes - a.likes);


    const size = [1500,500];
    const options = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [17, 80],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
  }

    if(calculateFrequencies(filteredPosts, maxPosts) == 0)
    {
        return ((null));
    }
    else {
        return (
            <ReactWordcloud words={calculateFrequencies(filteredPosts, maxPosts)}
                                  options={options}
                                  size={size} 
                                  className={`cloud ${fadeStatus ? 'fade-out' : 'fade-in'}`} />
               );
         }
};


export default Cloud;

