import PropTypes from 'prop-types';
import ImageGalleryItem from '../../ImageGalleryItem/ImageGalleryItem';
import styles from './styles.module.css';

const ImageGalleryList = ({ imagesList, setInfoForModal }) => {
  return (
    <ul className={styles.gallery}>
      {imagesList.map(({ id, tags, webformatURL, largeImageURL }, index) => {
        return (
          <ImageGalleryItem
            setInfoForModal={setInfoForModal}
            key={index}
            tag={tags}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};

ImageGalleryList.propTypes = {
  imagesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setInfoForModal: PropTypes.func.isRequired,
};

export default ImageGalleryList;
