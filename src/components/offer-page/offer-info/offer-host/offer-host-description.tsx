interface Props {
  description: string;
}

export function OfferHostDescription({ description }: Props) {
  return (
    <div className="offer__description">
      <p className="offer__text">{description}</p>
    </div>
  );
}
