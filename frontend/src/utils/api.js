export default function getAPIBaseUrl() {
  let apiUrl = "";

  if (!process.env.REACT_APP_SERVER_BASE && !process.env.REACT_APP_SERVER_PORT) {
    apiUrl = "http://localhost:8080";
  } else {
    apiUrl = `api`;
  }

  return apiUrl;
}

//Fetch data the posts endpoint
export async function getPosts() {
  //Declare an array and fetch data from the endpoint /posts to store.
  let posts = [];
  const BASE_URL = getAPIBaseUrl();

  

  //Data is fetched using the GET Request at /posts
  const res = await fetch(`${BASE_URL}/posts`);
  const data = await res.json();

  
  //If there is data, assign to array
  if (data.posts) {
    posts = data.posts;
  }

  return posts;
}

//Fetch tweets using the tweets endpoint
export async function getTweets() {
  //Array tweets is used to hold tweets
  let tweets = [];
  const BASE_URL = getAPIBaseUrl();

  
  //Fetch tweets using the tweets endpoint and fetch method
  const res = await fetch(`${BASE_URL}/tweets`);
  const data = await res.json();

  
  //If there is data, assign to tweets
  if (data.tweets) {
    tweets = data.tweets;
  }

  return tweets;
}
