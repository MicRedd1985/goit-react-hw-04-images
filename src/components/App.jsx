import React, { Component } from 'react';
import * as API from '../API/API';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import LoadMoreBtn from './Button/LoadMoreBtn';
import LoaderImg from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    error: '',
    isLoading: false,
    isShowModal: false,
    largeImageURL: '',
    tags: '',
    totalImages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      API.fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          if (hits.length) {
            return this.setState(prev => ({
              images: [...prev.images, ...hits],
              totalImages: totalHits,
            }));
          }
          this.setState(prevState => ({
            page: prevState.page + 1,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  loadMore = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSearch = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  onClick = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  ifLoadMore = () => {
    return this.state.totalImages - this.state.images.length > 12;
  };

  render() {
    const { isLoading, images, isShowModal, largeImageURL, tags, error } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSearch} />
        {images.length !== 0 && (
          <>
            <ImageGallery onClick={this.onClick} images={images} />
            {this.ifLoadMore() && !isLoading && (
              <LoadMoreBtn onClick={this.loadMore} />
            )}
          </>
        )}
        {isLoading && <LoaderImg />}

        {error && <h1>Sorry, so sorry! {tags}.</h1>}
        {isShowModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
export default App;
