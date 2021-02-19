import React, { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { IModalProps, IContact } from '../interfaces';

Modal.setAppElement('#root');

const ModalWindow: React.FC<IModalProps> = ({
  isOpen,
  toggleModal,
  idForEdit,
  setIdForEdit,
}) => {
  const [contact, setContact] = useState<IContact>({
    name: '',
    email: '',
    tel: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const addContact = async () => {
    try {
      await db.collection('contacts').doc().set(contact);

      toast('Contact Added', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editContact = async (id: string) => {
    try {
      await db.collection('contacts').doc(id).update(contact);
      toast('Contact Updated', {
        type: 'success',
        autoClose: 1500,
      });
      setIdForEdit('');
    } catch (error) {
      console.log(error);
    }
  };

  const getContactById = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await db.collection('contacts').doc(id).get();
      const selectedContact: any = response.data();

      setContact(selectedContact);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validateTelNumber = (tel: string) => {
    const re = /^\d+$/;
    return re.test(tel);
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateTelNumber(contact.tel)) {
      return toast('Invalid Telephone Number', {
        type: 'error',
        autoClose: 1500,
      });
    }

    if (!validateEmail(contact.email)) {
      return toast('Invalid Email', {
        type: 'error',
        autoClose: 1500,
      });
    }

    if (idForEdit === '') {
      addContact();
    } else {
      editContact(idForEdit);
    }

    setContact({ name: '', tel: '', email: '' });
    toggleModal();
  };

  const onModalClose = () => {
    setIdForEdit('');
    toggleModal();
  };

  useEffect(() => {
    if (idForEdit !== '') {
      getContactById(idForEdit);
    } else {
      setContact({
        name: '',
        email: '',
        tel: '',
      });
    }
  }, [idForEdit]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onModalClose}
      className='Modal'
      overlayClassName='Overlay'>
      {isLoading ? (
        <h1 className='text-center text-success'>Loading...</h1>
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 p-2'>
              <form className='card card-body' onSubmit={handleSubmit}>
                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>person</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={contact.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>phone</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Tel'
                    name='tel'
                    value={contact.tel}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>email</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={contact.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button className='btn btn-success btn-block'>
                  {idForEdit === '' ? 'Add' : 'Update'}
                </button>
              </form>
            </div>
          </div>

          <i className='material-icons btn-close-modal text-danger' onClick={onModalClose}>
            close
          </i>
        </div>
      )}
    </Modal>
  );
};

export default ModalWindow;
