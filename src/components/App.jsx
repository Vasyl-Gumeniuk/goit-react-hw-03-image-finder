import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchValue: '',
  };

  addSearchValue = inputData => {
    this.setState({
      searchValue: inputData,
    });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.addSearchValue} />
        <ImageGallery searchValue={searchValue} />
      </div>
    );
  }
}
