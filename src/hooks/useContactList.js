import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsSlice';

export const useContactList = () => {
  const { data, isLoading, error } = useGetContactsQuery();

  const filter = useSelector(state => state.filter.value);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return data?.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getFilteredContacts();

  return { data, visibleContacts, isLoading, error };
};
