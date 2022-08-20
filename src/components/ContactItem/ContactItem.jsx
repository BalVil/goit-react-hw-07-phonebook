import { useEffect } from 'react';
import { useDeleteContactMutation } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import { showSuccess, showError } from 'components/Notification/Notification';
import {
  Contact,
  ContactName,
  ContactNumber,
  DelButton,
} from './ContactItem.styled';
import { Spinner } from 'components/Spinner/Spinner';

export const ContactItem = ({ id, name, phone }) => {
  const [
    deleteContact,
    { data: isData, isSuccess, isLoading: isDeleting, isError },
  ] = useDeleteContactMutation();

  useEffect(() => {
    if (isSuccess) {
      showSuccess('Contact added');
    }
    if (isError) {
      showError('An error occurred when adding a contact');
    }
  }, [isError, isSuccess]);

  return (
    <Contact>
      <ContactName>{name}:</ContactName>
      <ContactNumber>{phone}</ContactNumber>
      <DelButton
        type="button"
        onClick={() => deleteContact(id)}
        disabled={isData || isDeleting}
      >
        {isDeleting && <Spinner size={18} />}
        Delete
      </DelButton>
    </Contact>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
