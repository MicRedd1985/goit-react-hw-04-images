import { useState, useEffect } from 'react';
import * as API from '../API/API';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import LoadMoreBtn from './Button/LoadMoreBtn';
import LoaderImg from './Loader/Loader';
import Modal from './Modal/Modal';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    API.fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length) {
          setImages(images => [...images, ...hits]);
          setTotalImages(totalHits);
        }
      })
      .catch(error => setError({ error }))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const onSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setIsShowModal(isShowModal => !isShowModal);
  };

  const ifLoadMore = () => {
    return totalImages - images.length > 12;
  };

  return (
    <>
      <Searchbar onSubmit={onSearch} />
      {images.length !== 0 && (
        <>
          <ImageGallery onClick={onClick} images={images} />
          {ifLoadMore() && !isLoading && (
            <LoadMoreBtn onClick={() => setPage(page => page + 1)} />
          )}
        </>
      )}
      {isLoading && <LoaderImg />}

      {error && <h1>Sorry, so sorry! {tags}.</h1>}
      {isShowModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
