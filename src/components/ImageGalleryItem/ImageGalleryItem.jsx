import { ImageGalleryFoto, ImageGallery } from './ImageGalleryItem.styled.jsx';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  id,
  largeImage,
}) => {
  return (
    <ImageGalleryFoto key={id} onClick={() => largeImage(largeImageURL)}>
      <ImageGallery src={webformatURL} alt={tags} />
    </ImageGalleryFoto>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.func.isRequired,
};
