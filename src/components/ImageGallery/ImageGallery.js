import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import fetchImages from '../../api/api';
import ImageGalleryList from './ImageGalleryList/ImageGalleryList';
import Button from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  fontSize: '20px',
  timeout: 3000,
});

export class ImageGallery extends Component {
  state = {
    imagesList: null,
    page: 1,
    error: null,
    status: 'idle',
    modalImageUrl: '',
    showModal: false,
    activeBtn: false,
  };

  componentDidUpdate = prevProps => {
    const preventProps = prevProps.searchValue;
    const nextProps = this.props.searchValue;
    const { page } = this.state;

    if (preventProps !== nextProps) {
      this.setState({ status: 'pending' });

      try {
        fetchImages(nextProps, page).then(res => {
          if (res.total === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState({
              status: 'idle',
              imagesList: null,
            });
            return;
          }
          Notiflix.Notify.success(`Good, there are ${res.totalHits} results.`);
          this.setState({
            imagesList: res.hits,
            page: 2,
            status: 'resolved',
            activeBtn: false,
          });
        });
      } catch (error) {
        this.setState({ error });
      }
    }
  };

  onBtnClick = () => {
    const { page } = this.state;
    const searchValue = this.props.searchValue;

    this.setState({
      status: 'pending',
      activeBtn: true,
    });

    try {
      fetchImages(searchValue, page).then(res => {
        if (page > res.totalHits / 12) {
          Notiflix.Notify.warning(
            'We are sorry, but you have reached the end of search results.'
          );
          this.setState({
            status: 'idle',
            activeBtn: true,
          });
          return;
        }

        this.setState(prevState => ({
          imagesList: [...prevState.imagesList, ...res.hits],
          page: prevState.page + 1,
          status: 'resolved',
          activeBtn: false,
        }));
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setInfoForModal = url => {
    this.setState({ modalImageUrl: url });
    this.toggleModal();
  };

  render() {
    const { imagesList, status, showModal, modalImageUrl, activeBtn } =
      this.state;

    if (status === 'pending') {
      Loading.dots();
    } else {
      Loading.remove();
    }

    if (imagesList || status === 'resolved') {
      return (
        <div>
          <ImageGalleryList
            imagesList={imagesList}
            setInfoForModal={this.setInfoForModal}
          />
          <Button onBtnClick={this.onBtnClick} disabled={activeBtn} />
          {showModal && (
            <Modal onClose={this.toggleModal} largeImageURL={modalImageUrl} />
          )}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
