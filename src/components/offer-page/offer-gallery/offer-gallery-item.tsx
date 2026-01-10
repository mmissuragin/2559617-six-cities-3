interface Props {
  srcPhoto: string;
}

export function OfferGalleryItem({ srcPhoto }: Props): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img
        className="offer__image"
        src={srcPhoto}
        alt="Photo studio"
      />
    </div>
  );
}
