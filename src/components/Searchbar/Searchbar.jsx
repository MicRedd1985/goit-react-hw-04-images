import { Component } from 'react';
import {
  SearchbarHead,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled.jsx';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    query: '',
  };

  handleSearchChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('OMG,error! Do it again!', { position: 'top-center' });
      this.setState({ query: '' });
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarHead>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch size={18} /> <span>Search</span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleSearchChange}
          />
        </SearchForm>
      </SearchbarHead>
    );
  }
}
