//Testing environment provided by Professor Judi
const chai = require('chai');
const request = require('supertest');
//const assert = require('assert');
const app = require('../src/app');
const conn = require('../test/connect');
const reddit = require('../reddit.js');
const twitter = require('../twitter.js');

const expect = chai.expect;


const dummy_post = {

    title: "test",
    ups: 4,
    permalink: "https://craftofcoding.wordpress.com/",

};

const dummy_user = {

    username: 'Judi',
    id: 1539530

}

const dummy_tweet = {

  text: "This is a tweet!",
  user: dummy_user,
  favorite_count: 51,
  retweet_count: 7,
  tweet_id: 19684053081,
  
};

describe('Testing routes', ()=> {
    before((done) => {
        conn.connect().then(()=>{
                console.log('Connection established');
                return done();
            })
            .catch((err)=>{
                console.error(err);
                return done(err);
            });
    });

    after((done)=>{
        console.log("Closing connection");
        conn.close().then(()=>done()).catch((err) => done(err));
    });

    it('Checking to see if GET/posts is empty', (done) =>{
        request(app).get('/api/posts').then((res)=>{
                
                const posts = res.body.posts;
                expect(posts.length).to.equal(0);
                done();

            }).catch((err)=>done(err));
    })

    it('Checking to see if GET/tweets is empty', (done) =>{
        request(app).get('/api/tweets').then((res)=>{
                const tweets = res.body.tweets;
                expect(tweets.length).to.equal(0);
                done();
        })
    })
    it('Checking to see if GET/tweets returns data', (done) =>{
        request(app).get('/api/tweets').set('Accept', 'application/json').set('Content-type', 'application/json').then((res)=>{
                const tweets = res.body.tweets;
                expect(tweets).exist;
                done();
                
            }).catch((err)=>done(err));
    })

});

describe('Testing Reddit & Twitter functions', ()=> {
    before((done) => {
        conn.connect().then(()=>{
                console.log('Connection established #2');
                return done();
            })
            .catch((err)=>{
                console.error(err);
                return done(err);
            });
    });

    after((done)=>{
        console.log("Closing connection #2");
        conn.close().then(()=>done()).catch((err) => done(err));
    });


    it('trying to call Reddit API', (done) =>{

         reddit.fetchRedditData();
         done();
        
    });


    it('trying to create Reddit post', (done) =>{

         reddit.createRedditPost(dummy_post);
         done();
        
    });


    it('trying to store Reddit post into database', (done) =>{

        const dummyList = [dummy_post];

        reddit.storeRedditData(dummyList);
        done();
        
    });


    it('trying to process null Reddit post', (done) =>{
         
         expect(function() { reddit.createRedditPost(); }).to.throw(Error);
         done();
        
    });


    it('trying to call Twitter API', (done) =>{

        expect(function() { twitter.fetchTwitterData(); }).to.not.throw(Error);
        done();
         
    });


    it('trying to create Twitter post', (done) =>{

         twitter.createTwitterPost(dummy_tweet);
         done();
         
    });


    it('trying to process null Twitter post', (done) =>{
         
         expect(function() { twitter.createTwitterPost(); }).to.throw(Error);
         done();
        
    });


});


describe('Testing fail cases', ()=> {



     it('calling StoreRedditData with no args', (done) =>{

        expect(function(){ reddit.storeRedditData() }   ).to.throw
        done();
        
    });



});
