import { useState, useEffect } from 'react';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import {
  showSuccess,
  showError,
  showWarning,
} from 'components/Notification/Notification';

export const useAddContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact, { isSuccess, isError, isLoading: isAdding, error }] =
    useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

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
      showWarning(`${name} is already in contacts `);
      return;
    }

    addContact({ name, phone });

    // alternative to useEffect:
    // try {
    //   await addContact({ name, phone });
    //   toast.success('Contact added');
    //   resetForm();
    // } catch (error) {
    //   toast.error('An error occurred when adding a contact');
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess('Contact added');
      resetForm();
    }
    if (isError) {
      showError('An error occurred when adding a contact');
    }
  }, [isError, isSuccess]);

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return { name, phone, handleChange, handleSubmit, isAdding, error };
};
