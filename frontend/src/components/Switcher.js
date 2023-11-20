import { useState } from 'react';
import './Switcher.css';

const Switcher = ({ redditHandler, twitterHandler }) => {
  const [redditOn, setRedditOn] = useState(true);
  const [twitterOn, setTwitterOn] = useState(true);

  const handleRedditToggle = () => {
    setRedditOn(!redditOn);
    redditHandler(!redditOn);
  };

  const handleTwitterToggle = () => {
    setTwitterOn(!twitterOn);
    twitterHandler(!twitterOn);
  };

  const redditImage = redditOn ? './reddit-on.png' : './reddit-off.png';
  const twitterImage = twitterOn ? './twitter-on.png' : './twitter-off.png';

  return (
    <div title='Feed Switcher' className='switcher-container'>
      <h3>Feed Switcher</h3>
      <div className='image-container'>
        <div style={{ marginRight: '10px' }}>
          <img src={redditImage} alt='reddit' width='32' height='32' onClick={handleRedditToggle} style={{ cursor: 'pointer' }} />
        </div>
        <div>
          <img src={twitterImage} alt='twitter' width='32' height='32' onClick={handleTwitterToggle} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div> 
  );
};

export default Switcher;
