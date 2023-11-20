import './Banner.css';

// Basic banner displayed at the top of the page
const Banner = ({ text }) => {
  return (
    <div className='banner'>
      <h1>{text}</h1>
    </div>
  );
};

export default Banner;

