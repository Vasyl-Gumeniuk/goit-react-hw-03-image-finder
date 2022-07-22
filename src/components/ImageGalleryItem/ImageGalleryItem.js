// import { Modal } from '../Modal/Modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import styles from './styles.module.css';

const ImageGalleryItem = ({
  id,
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
    <li key={id} id={id} className={styles.gallery_item} onClick={handleClick}>
      <img className={styles.gallery_image} src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
