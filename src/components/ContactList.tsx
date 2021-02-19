import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { IContact } from '../interfaces';
import { db } from '../firebase';

type ContactListProps = {
  title: string;
  contacts: IContact[];
  toggleModal: () => void;
  setIdForEdit: Dispatch<SetStateAction<string>>;
};

const ContactList: React.FC<ContactListProps> = ({
  title,
  contacts,
  toggleModal,
  setIdForEdit,
}) => {
  const toggleFavorites = async (contact: IContact) => {
    try {
      await db
        .collection('contacts')
        .doc(contact.id)
        .update({ ...contact, favorite: !contact.favorite });
      toast(
        !contact.favorite
          ? 'Contact Added To Favorites'
          : 'Contact Removed From Favorites',
        {
          type: 'success',
          autoClose: 1500,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeContact = async (id: string) => {
    try {
      await db.collection('contacts').doc(id).delete();
      toast('Contact Removed', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editContact = (id: string) => {
    setIdForEdit(id);
    toggleModal();
  };

  return (
    <div className='row'>
      <div className='col-md-12 p-2'>
        <div className='d-flex justify-content-center align-items-center'>
          <h3 className='text-center p-4 mb-0'>{title}</h3>
        </div>

        {contacts.map((contact) => (
          <div className='card mb-2' key={contact.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <div>
                  <h5 className='text-success'>{contact.name}</h5>
                  <h5>{contact.tel}</h5>
                  <h5>{contact.email}</h5>
                </div>

                <div>
                  <i
                    className={classNames('material-icons', {
                      'text-success': contact.favorite,
                    })}
                    onClick={() => toggleFavorites(contact)}>
                    star
                  </i>
                  <i className='material-icons' onClick={() => editContact(contact.id!)}>
                    edit
                  </i>
                  <i
                    className='material-icons'
                    onClick={() => removeContact(contact.id!)}>
                    delete
                  </i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
