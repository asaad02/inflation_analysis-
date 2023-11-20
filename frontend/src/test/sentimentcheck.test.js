import * as sentimentcheck from "../utils/sentiment";

const items = [
    {title: "Inflation is rising", url: "twitter.com/user1/status/1200", likes: 200, origin: "Twitter"},
    {title: "Prices still raising due to inflation", url: "twitter.com/user2/status/1500", likes: 100, origin: "Twitter"},
    {title: "Saving when inflation is rising", url: "twitter.com/user3/status/1800", likes: 800, origin: "Twitter"},
    {title: "Inflation isn't going well", url: "reddit.com/r/inflationnews/comments/1ax", likes: 1800, origin: "Reddit"},
    {title: "Trouble with inflation", url: "reddit.com/r/inflationnews/comments/2ytux", likes: 1200, origin: "Reddit"},
    
];

const maxPosts = 5;

describe('Testing sentiment functions', ()=>{
    it("should return an array with tweets with 100% neutral percentage", ()=>{
        let check = sentimentcheck.twitterSentimentAnalysis(items,maxPosts);
        expect(check[2].percent).toBe("100%");
    });

    it("should return an array with 3 neutral tweets", ()=>{
        let check = sentimentcheck.twitterSentimentAnalysis(items,maxPosts);
        expect(check[2].value).toBe(3);
    });

    it("should return an array containing 2 reddit posts", ()=>{
        let check = sentimentcheck.redditSentimentAnalysis(items,maxPosts);
        expect(check[0].value + check[1].value + check[2].value).toEqual(2);
    });

    it("should return an array containing 1 negative reddit post", ()=>{
        let check = sentimentcheck.redditSentimentAnalysis(items,maxPosts);
        expect(check[1].value).toBe(1);
    });

    it("should return an array containing 5 posts/tweets", ()=>{
        let check = sentimentcheck.aggregateSentimentAnalysis(items,maxPosts);
        expect(check[0].value + check[1].value + check[2].value).toEqual(5);
    })
    it("should return a radius of 3.5", ()=>{
        let check = sentimentcheck.sectorFormula(10,5,80,5,2,1);
        expect(check.radius).toEqual(3.5);
    })

})