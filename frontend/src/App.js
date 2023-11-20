import React from 'react';
import { useState } from 'react';
import Banner from './components/Banner';
import Cards from './components/Cards';
import Switcher from './components/Switcher';
import Settings from './components/Settings';
import About from './components/About';
import Analysis from './components/Analysis';
import Cloud from './components/Cloud';

const App = () => {
  const [maxPosts, setMaxPosts] = useState(20);
  const [postSize, setPostSize] = useState('medium');
  const [twitterOn, setTwitterOn] = useState(true);
  const [redditOn, setRedditOn] = useState(true);
  const [fadeStatus, setFadeStatus] = useState(false);

  const handleMaxPostsChange = (value) => {
    setMaxPosts(value);
  }

  const handlePostSizeChange = (size) => {
    setPostSize(size);
  }

  const redditHandler = (bool) => {
    setRedditOn(bool);
  }
  
  const twitterHandler = (bool) => {
    setTwitterOn(bool);
  }

  const handleFadeStatusChange = (bool) => {
    setFadeStatus(bool);
  }

  return (
    <div>
      <About onFadeChange={handleFadeStatusChange} />
      <Banner text="CIS3760 Inflation Project" />
      <Cards maxPosts={maxPosts} postSize={postSize} fadeStatus={fadeStatus} redditOn={redditOn} twitterOn={twitterOn}/>
      <Analysis maxPosts={maxPosts} redditOn={redditOn} twitterOn={twitterOn} fadeStatus={fadeStatus} />
      <Cloud maxPosts={maxPosts} redditOn={redditOn} twitterOn={twitterOn} fadeStatus={fadeStatus} />
      <Settings onLimitChange={handleMaxPostsChange} onSizeChange={handlePostSizeChange} maxPosts={maxPosts} />
      <Switcher redditHandler={redditHandler} twitterHandler={twitterHandler}/>
    </div>
  );
};

export default App;
