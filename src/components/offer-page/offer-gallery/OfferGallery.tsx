import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { OfferGalleryItem } from './OfferGalleryItem';

export function OfferGallery(): JSX.Element | null {
  const currentOffer = useSelector(
    (state: RootState) => state.currentOffer
  );

  if (!currentOffer) {
    return null;
  }

  const images = currentOffer.images.slice(0, 6);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image) => (
          <OfferGalleryItem key={image} srcPhoto={image} />
        ))}
      </div>
    </div>
  );
}
