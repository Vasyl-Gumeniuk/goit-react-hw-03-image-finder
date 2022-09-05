import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import fetchImages from '../api/api';
import Button from '../components/Button/Button';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  fontSize: '20px',
  timeout: 3000,
});

export class App extends Component {
  state = {
    searchValue: '',
    imagesList: [],
    totalHits: null,
    page: 1,
    error: null,
    status: 'idle',
    modalImageUrl: '',
    showModal: false,
    activeBtn: false,
  };

  addSearchValue = inputData => {
    this.setState({
      searchValue: inputData,
    });
    this.resetStates();
  };

  resetStates = () => {
    this.setState({ imagesList: [], page: 1 });
  };

  componentDidUpdate = (_, prevState) => {
    const { searchValue, page } = this.state;

    const preventQuery = prevState.searchValue;
    const nextQuery = searchValue;

    const preventPage = prevState.page;
    const nextPage = page;

    if (
      preventQuery !== nextQuery ||
      (preventPage !== nextPage && nextPage > 1)
    ) {
      try {
        this.setState({
          status: 'pending',
          activeBtn: true,
        });

        fetchImages(nextQuery, page).then(res => {
          if (res.total === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState({
              status: 'idle',
              imagesList: [],
            });
            return;
          }

          if (preventQuery !== nextQuery) {
            Notiflix.Notify.success(
              `Good, there are ${res.totalHits} results.`
            );
          }

          if (res.hits.length !== 0) {
            this.setState(prevState => ({
              imagesList: [...prevState.imagesList, ...res.hits],
              status: 'resolved',
              activeBtn: false,
              totalHits: res.totalHits,
            }));
          }

          if (page > res.totalHits / 12) {
            Notiflix.Notify.warning(
              'We are sorry, but you have reached the end of search results.'
            );
            this.setState({
              status: 'idle',
              page: 1,
            });
            return;
          }
        });
      } catch (error) {
        this.setState({ error });
      }
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
    const {
      searchValue,
      imagesList,
      totalHits,
      status,
      modalImageUrl,
      activeBtn,
      showModal,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.addSearchValue} />
        <ImageGallery
          searchValue={searchValue}
          imagesList={imagesList}
          status={status}
          modalImageUrl={modalImageUrl}
          showModal={showModal}
          toggleModal={this.toggleModal}
          setInfoForModal={this.setInfoForModal}
        />
        {imagesList.length > 0 && imagesList.length < totalHits && (
          <Button
            onBtnClick={() =>
              this.setState(prevState => ({ page: prevState.page + 1 }))
            }
            disabled={activeBtn}
          />
        )}
        ;
      </div>
    );
  }
}
