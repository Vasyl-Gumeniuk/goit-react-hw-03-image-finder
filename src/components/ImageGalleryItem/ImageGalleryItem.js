import PropTypes from 'prop-types';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import styles from './styles.module.css';

const ImageGalleryItem = ({
  id,
  tag,
  webformatURL,
  largeImageURL,
  setInfoForModal,
}) => {
  const handleClick = () => {
    Loading.pulse();

    setInfoForModal(largeImageURL);
    Loading.remove();
  };

  return (
    <li id={id} className={styles.gallery_item} onClick={handleClick}>
      <img className={styles.gallery_image} src={webformatURL} alt={tag} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  setInfoForModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
