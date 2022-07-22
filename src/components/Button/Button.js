import styles from './styles.module.css';

const Button = ({ onBtnClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onBtnClick}>
      Load more
    </button>
  );
};

export default Button;
