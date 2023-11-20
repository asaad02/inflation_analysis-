import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Settings.css'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '40px',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
  }
};

Modal.setAppElement(document.getElementById('root'));

const Settings = ({ onLimitChange, onSizeChange, maxPosts }) => {
  const gearIcon = './gear.png';
  const xIcon = './x.png';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [limitValue, setLimitValue] = useState(maxPosts);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [color, setColor] = useState('#FFFFFF');

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleLimitChange = (event) => {
    setLimitValue(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onLimitChange(limitValue);
    onSizeChange(selectedSize);
    handleCloseModal();
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  }

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <div>
      <img src={gearIcon} title='Settings' alt='Settings' onClick={handleOpenModal} 
        style={{ position: 'absolute', top: '10px', right: '10px' }} />
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}
        style={customStyles} contentLabel='Settings'>
        <div className='modal-header'>  
          <h2>Settings</h2>
          <img src={xIcon} alt='Close' className='exit-button' onClick={handleCloseModal} />
        </div>
        <div className='modal-content'>
          <form onSubmit={handleSubmit}>
            <div className='settings-container'>
              <label>
                Maximum posts on page:       
              <input type='number' defaultValue={maxPosts} onChange={handleLimitChange} min='1' max='10000'/>
              </label>
              <label>
                Post size: 
                <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
                  <option value='small'>Small</option>
                  <option value='medium'>Medium</option>
                  <option value='large'>Large</option>
                  <option value='row'>Row</option>
                </select>
              </label>
              <input type='color' id='colorPicker' value={color} onChange={handleColorChange} />
            </div>
            <div className='submit-button-wrapper'>
              <button className='submit-button' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;
