import { getTweets } from "../utils/api";

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Testing getTweets', ()=>{
    beforeEach(()=>{
        fetch.resetMocks();
        fetch.mockResponseOnce(JSON.stringify({
            "tweets":[{title: "Testing the Twitter API", url: "twitter.com"},
                      {title: "Working with Mocks", url: "google.ca"}
            ]
        }));
    });

    it("should return an object", ()=>{
        
        let fetchedTweets = getTweets().then(function(fetchedTweets){});
        expect(typeof fetchedTweets === 'object').toBe(true);
        
    });

    it("should return 2 tweets", ()=>{
        return getTweets().then(function(result){
            expect(Object.keys(result).length).toBe(2);
        });
    });

    it("should contain a specific tweet", ()=>{
        return getTweets().then(function(result){
            expect(result).toContainEqual(expect.objectContaining({title: "Testing the Twitter API", url: "twitter.com"}));
        });
    });

    it("should contain the title property", ()=>{
        return getTweets().then(function(result){
            expect(result[0]).toHaveProperty('title');
        });
    });

    it("should contain the url property", ()=>{
        return getTweets().then(function(result){
            expect(result[0]).toHaveProperty('url');
        });
    });

    it("should not return null", ()=>{
        return getTweets().then(function(result){
            expect(result).not.toBe(null);
        })
    })
})
