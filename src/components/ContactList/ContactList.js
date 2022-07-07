import PropTypes from 'prop-types';
import styles from './styles.module.css';

const ContactList = ({ getVisibleContacts, deleteContact }) => {
  return (
    <div>
      <ul className={styles.contactsList}>
        {getVisibleContacts.map(({ id, name, number }) => {
          return (
            <li className={styles.listItem} key={id} id={id}>
              <span>{name}: </span>
              <span>{number}</span>
              <button
                type="button"
                className={styles.btn}
                onClick={evt => deleteContact(evt)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  getVisibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
