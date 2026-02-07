import { TOffer } from '../../../../types/offers';
import { OfferHostDescription } from './OfferHostDescription';
import { OfferHostUser } from './OfferHostUser';

interface Props {
  host: TOffer['host'];
  description: string;
}

export function OfferHost({ host, description }: Props) {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <OfferHostUser host={host} />
      <OfferHostDescription description={description} />
    </div>
  );
}
