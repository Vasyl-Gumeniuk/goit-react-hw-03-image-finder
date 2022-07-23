import React, { Component } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../icons/searchIcon.svg';
import Notiflix from 'notiflix';
import styles from './styles.module.css';

Notiflix.Notify.init({
  position: 'right-top',
  width: '400px',
  fontSize: '20px',
});

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = evt => {
    const { value } = evt.currentTarget;
    this.setState({ inputValue: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim() === '') {
      Notiflix.Notify.info('Please enter request.');
      return;
    }

    let inputData = inputValue;

    this.props.onSubmit(inputData);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <img src={searchIcon} height={30} alt="search-icon"></img>
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
