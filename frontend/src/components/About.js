import { useState } from 'react';
import './About.css';

const About = ({ onFadeChange }) => {
  const [showAbout, setShowAbout] = useState(false);

  // Dim other components and display About page in its place
  const toggleAbout = () => {
    onFadeChange(!showAbout);
    if(!showAbout) {
      // Wait for fade-out if other components are present
      setTimeout(() => setShowAbout(true), 200);
    } else {
      setShowAbout(false);
    }
  };

  // Display About text near top right, toggling multiple sections for each developer
  return (
    <div>
      <div title='About' className='about' onClick={toggleAbout}>
        <h3 onClick={toggleAbout}>About</h3>
      </div>
      {showAbout && (
        <div className='about-page'>
          <h1>About Us</h1>
          <div className='about-section'>
            <div>
              <h2>Issa</h2>
              <p>
                Product Owner<br/>
                Major: Software Engineering<br/>
                Year: 4<br/>
                Specialties: Defining, Planning, Delivery of Products
              </p>
            </div>
            <img src='./dev1.png' alt='dev1 image' width='128' height='128' />
          </div>
          <div className='about-section'>
            <div>
              <h2>Bladen</h2>
              <p>
                Frontend Developer<br/>
                Major: Computer Science<br/>
                Year: 4<br/>
                Specialties: Design, React, Crunch
              </p>
            </div>
            <img src='./dev2.png' alt='dev2 image' width='128' height='128' />
          </div>
          <div className='about-section'>
            <div>
              <h2>Joseph</h2>
              <p>
                Developer<br/>
                Major: Software Engineering<br/>
                Year: 3<br/>
                Specialties: Testing, Documentation, REST
              </p>
            </div>
            <img src='./dev3.png' alt='dev3 image' width='128' height='128' />
          </div>
          <div className='about-section'>
            <div>
              <h2>Luc</h2>
              <p>
                Developer<br/>
                Major: Computer Science<br/>
                Year: 3<br/>
                Specialties: Backend, MongoDB, DevOps
              </p>
            </div>
            <img src='./dev4.png' alt='dev4 image' width='128' height='128' />
          </div>
        </div>
      )}
    </div> 
  );
};

export default About;
