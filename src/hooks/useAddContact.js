import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';

export const useAddContact = () => {
  const [addContact, { isLoading: isAdding, error }] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  // чи можливо без useState та handleChange?
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

    // чи треба перевіряти на isSuccess та isError?
    try {
      await addContact({ name, phone });
      toast.success('Contact added');
      resetForm();
    } catch (error) {
      toast.error('An error occurred when adding a contact');
      console.log(error);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return { name, phone, handleChange, handleSubmit, isAdding, error };
};
