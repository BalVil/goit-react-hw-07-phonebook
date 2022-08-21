import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsSlice';

export const useContactList = () => {
  const { data, isLoading, error } = useGetContactsQuery();

  const filter = useSelector(state => state.filter.value);

  const FilteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase().trim();

    return (
      data?.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter)
      ) ?? []
    );
  }, [data, filter]);

  return { data, FilteredContacts, isLoading, error };
};
