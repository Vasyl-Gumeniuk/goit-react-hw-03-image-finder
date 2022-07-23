import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = ({ onBtnClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={styles.button}
      onClick={onBtnClick}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
