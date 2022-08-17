import { useAddContact } from 'hooks/useAddContact';
import { Form, Button, FormLabel } from './ContactForm.styled';
import { Spinner } from 'components/Spinner/Spinner';
import { Notification } from 'components/Notification/Notification';

const ContactForm = () => {
  const { name, phone, handleChange, handleSubmit, isAdding, error } =
    useAddContact();

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
          {isAdding && <Spinner size={18} />}
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
