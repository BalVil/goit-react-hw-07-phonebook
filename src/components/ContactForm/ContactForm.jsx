// import { useAddContact } from 'hooks/useAddContact';
import { Form, Button, FormLabel, FormSpin } from './ContactForm.styled';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { addContact } from 'redux/contactsSlice';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import { Spinner } from 'components/Spinner/Spinner';
import { Notification } from 'components/Notification/Notification';

const ContactForm = () => {
  // const { name, number, handleChange, handleSubmit } = useAddContact();
  const [addContact, { isSuccess, isError, isLoading: isAdding, error }] =
    useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const sameName =
      contacts.findIndex(
        item => item.name.toLowerCase() === name.toLowerCase()
      ) !== -1;

    if (sameName) {
      toast.warn(`${name} is already in contacts `);
      return;
    }

    const newContact = {
      name,
      phone,
    };

    addContact(newContact);

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <FormLabel>Name</FormLabel>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="phone">
          <FormLabel>Number</FormLabel>
          <input
            value={phone}
            onChange={handleChange}
            type="tel"
            name="phone"
            id="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <Button type="submit" disabled={isAdding}>
          {isAdding && (
            <FormSpin>
              <Spinner size={18} />
            </FormSpin>
          )}
          Add contact
        </Button>
      </Form>
      {error && (
        <Notification status="error">Something went wrong.</Notification>
      )}
    </>
  );
};

export default ContactForm;
