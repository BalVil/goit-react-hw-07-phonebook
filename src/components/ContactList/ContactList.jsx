import { ContactItem } from 'components/ContactItem/ContactItem';
import { useContactList } from 'hooks/useContactList';
import { Spinner } from 'components/Spinner/Spinner';
import { Notification } from 'components/Notification/Notification';

const ContactList = () => {
  const {
    data: contacts,
    visibleContacts,
    isLoading,
    error,
  } = useContactList();

  return (
    <>
      {isLoading && <Spinner />}
      {contacts && (
        <ul>
          {visibleContacts.length > 0 ? (
            visibleContacts.map(({ id, name, phone }) => {
              return (
                <ContactItem
                  key={id}
                  name={name}
                  phone={phone}
                  id={id}
                ></ContactItem>
              );
            })
          ) : (
            <Notification status="info">
              No contacts in the phonebook
            </Notification>
          )}
        </ul>
      )}
      {error && (
        <Notification status="error">Something went wrong.</Notification>
      )}
    </>
  );
};

export default ContactList;
