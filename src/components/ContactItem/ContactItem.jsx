import { useDeleteContactMutation } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import {
  Contact,
  ContactName,
  ContactNumber,
  DelButton,
} from './ContactItem.styled';
import { Spinner } from 'components/Spinner/Spinner';

export const ContactItem = ({ id, name, phone }) => {
  const [deleteContact, { data, isLoading: isDeleting }] =
    useDeleteContactMutation();

  return (
    <Contact>
      <ContactName>{name}:</ContactName>
      <ContactNumber>{phone}</ContactNumber>
      <DelButton
        type="button"
        onClick={() => deleteContact(id)}
        disabled={data || isDeleting}
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
