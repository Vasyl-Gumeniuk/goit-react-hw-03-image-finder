import ImageGalleryItem from '../../ImageGalleryItem/ImageGalleryItem';
import styles from './styles.module.css';

const ImageGalleryList = ({ imagesList, setInfoForModal }) => {
  return (
    <ul className={styles.gallery}>
      {imagesList.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            setInfoForModal={setInfoForModal}
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};

export default ImageGalleryList;
