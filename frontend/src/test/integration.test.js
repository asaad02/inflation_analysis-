import * as integration from "../utils/api";
import * as sentiment from "../utils/sentiment";
import * as frequency from "../utils/frequency";

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(()=>{
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({
        "posts":[{title: "Inflation is rising", url: "reddit.com", likes: 1000, origin: "Reddit"},
                  {title: "Struggling with inflation and rising prices", url: "reddit.com", likes: 1500, origin: "Reddit"},
        ],
        "tweets":[{title: "Inflation causing headaches", url: "twitter.com", likes: 200, origin: "Twitter"}]
    }));
});

describe("Testing backend and frontend", ()=>{
    it("should connect to the backend using the get/posts endpoint", ()=>{
        return integration.getPosts().then(function(result){
            expect(typeof result === 'object').toBe(true);
        });
    });

    it("should connect to the backend using the get/tweets endpoint", ()=>{
        return integration.getTweets().then(function(result){
            expect(typeof result === 'object').toBe(true);
        });
    });

    it("should have specific fetched post", ()=>{
        return integration.getPosts().then(function(result){
            expect(result).toContainEqual(expect.objectContaining({title: "Inflation is rising", url: "reddit.com", likes: 1000, origin: "Reddit"}));
        });
    });

    it("should have specific fetched tweet", ()=>{
        return integration.getTweets().then(function(result){
            expect(result).toContainEqual(expect.objectContaining({title: "Inflation causing headaches", url: "twitter.com", likes: 200, origin: "Twitter"}));
        });
    });

    it("should return an array with 1 negative post", ()=>{
        return integration.getPosts().then(function(result){
            let check = sentiment.redditSentimentAnalysis(result,10);
            expect(check[1].value).toBe(1);
        })
    });

    it("should return an array with 1 neutral tweet", ()=>{
        return integration.getTweets().then(function(result){
            let check = sentiment.twitterSentimentAnalysis(result,10);
            expect(check[2].value).toBe(1);
        })
    });

    it("should return 2 for frequency of inflation", ()=>{
        return integration.getPosts().then(function(result){
            let check = frequency.calculateFrequencies(result,10);
            expect(check[1].value).toBe(2);
        })
    });

    it("should return 1 for frequency of inflation", ()=>{
        return integration.getTweets().then(function(result){
            let check = frequency.calculateFrequencies(result,10);
            expect(check[1].value).toBe(1);
        })
    })


})