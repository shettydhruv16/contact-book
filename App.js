import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './index.css';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    backgroundColor: '#121212', /* Black background */
    color: '#ffffff', /* White text */
    border: 'none',
    borderRadius: '10px',
    padding: '20px',
    width: '400px',
    maxWidth: '90%',
    margin: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', /* Dark overlay */
  },
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    facebookUsername: '',
    instagramUsername: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get('http://localhost:3000/contacts');
    setContacts(response.data);
  };

  const handleAdd = async () => {
    const response = await axios.post('http://localhost:3000/contacts', newContact);
    setContacts([...contacts, response.data]);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      facebookUsername: '',
      instagramUsername: ''
    });
    setModalIsOpen(false);
  };

  const handleUpdate = async (id) => {
    const contact = contacts.find(contact => contact._id === id);
    const updatedContact = {
      ...contact,
      name: prompt('New Name:', contact.name),
      email: prompt('New Email:', contact.email),
      phone: prompt('New Phone:', contact.phone),
      facebookUsername: prompt('New Facebook Username:', contact.facebookUsername),
      instagramUsername: prompt('New Instagram Username:', contact.instagramUsername),
    };
    const response = await axios.put(`http://localhost:3000/contacts/${id}`, updatedContact);
    setContacts(contacts.map(contact => (contact._id === id ? response.data : contact)));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/contacts/${id}`);
    setContacts(contacts.filter(contact => contact._id !== id));
  };

  return (
    <div className="container">
      <h1>Contact Manager</h1>
      <button onClick={() => setModalIsOpen(true)} className="add-button">Add New Contact</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <h2>Add Contact</h2>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={e => setNewContact({ ...newContact, name: e.target.value })}
          className="modal-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={e => setNewContact({ ...newContact, email: e.target.value })}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Facebook Username"
          value={newContact.facebookUsername}
          onChange={e => setNewContact({ ...newContact, facebookUsername: e.target.value })}
          className="modal-input"
        />
        <input
          type="text"
          placeholder="Instagram Username"
          value={newContact.instagramUsername}
          onChange={e => setNewContact({ ...newContact, instagramUsername: e.target.value })}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button onClick={handleAdd} className="modal-button">Add Contact</button>
          <button onClick={() => setModalIsOpen(false)} className="modal-button cancel">Cancel</button>
        </div>
      </Modal>

      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact._id} className="contact-item">
            <div className="contact-info">
              <div className="contact-details">
                {contact.name}
                <br />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <br />
                {contact.phone}
              </div>
              <div className="social-links">
                <a href={`https://api.whatsapp.com/send?phone=${contact.phone}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href={`https://m.me/${contact.facebookUsername}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href={`https://instagram.com/${contact.instagramUsername}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="action-buttons">
              <button onClick={() => handleUpdate(contact._id)} className="action-button">Edit</button>
              <button onClick={() => handleDelete(contact._id)} className="action-button delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;