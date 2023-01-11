import { useState } from 'react';
import {
  SearchbarHead,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled.jsx';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.error('OMG,error! Do it again!', { position: 'top-center' });
      setQuery('');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHead>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size={18} /> <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </SearchbarHead>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
