import { TOffer } from '../../../../types/offers';
import { OfferHostDescription } from './offer-host-description';
import { OfferHostUser } from './offer-host-user';

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
