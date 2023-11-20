import { calculateFrequencies } from "../utils/frequency.js";

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();


const post1 = {

    title: "i'm at a loss for words",
    ups: 4,
    permalink: "https://courselink.uoguelph.ca/",

};

const post2 = {

    title: "four words is plenty",
    ups: 30,
    permalink: "https://craftofcoding.wordpress.com/",

};

const postArray = [post1, post2];

describe('Testing calculateFrequencies()', ()=>{
    beforeEach(()=>{
        fetch.resetMocks();
        fetch.mockResponseOnce(JSON.stringify({
            "posts":[{title: "two words", url: "twitter.com"},
                      {title: "more than two", url: "google.ca"}
            ]
        }));
    });


    it("word should occur 2 times", ()=>{

        let freq = calculateFrequencies(postArray,2);
        expect(freq[9].value).toBe(2); 
               
    });


    it("should return an array", ()=>{
        
        let freq = calculateFrequencies(postArray,2);
        expect(Array.isArray(freq)).toBe(true); 
               
    });


    it("should not return 0 (error code)", ()=>{
        
        let freq = calculateFrequencies(postArray,2);
        expect(freq).not.toBe(0);

    })

})
