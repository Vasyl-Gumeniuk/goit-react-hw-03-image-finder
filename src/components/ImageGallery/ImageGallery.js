import PropTypes from 'prop-types';
import ImageGalleryList from './ImageGalleryList/ImageGalleryList';
import { Modal } from '../Modal/Modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const ImageGallery = ({
  imagesList,
  status,
  modalImageUrl,
  showModal,
  toggleModal,
  setInfoForModal,
}) => {
  if (status === 'pending') {
    Loading.dots();
  } else {
    Loading.remove();
  }

  if (imagesList.length !== 0 || status === 'resolved') {
    return (
      <div>
        <ImageGalleryList
          imagesList={imagesList}
          setInfoForModal={setInfoForModal}
        />
        {showModal && (
          <Modal onClose={toggleModal} largeImageURL={modalImageUrl} />
        )}
        ;
      </div>
    );
  }
};

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  status: PropTypes.string.isRequired,
  modalImageUrl: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setInfoForModal: PropTypes.func.isRequired,
};
