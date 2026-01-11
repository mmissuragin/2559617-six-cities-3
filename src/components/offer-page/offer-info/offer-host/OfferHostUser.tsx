import { TOffer } from '../../../../types/offers';

interface Props {
  host: TOffer['host'];
}

export function OfferHostUser({ host }: Props) {
  const { name, avatarUrl, isPro } = host;

  return (
    <div className="offer__host-user user">
      <div
        className={`offer__avatar-wrapper user__avatar-wrapper ${
          isPro ? 'offer__avatar-wrapper--pro' : ''
        }`}
      >
        <img
          className="offer__avatar user__avatar"
          src={avatarUrl}
          width="74"
          height="74"
          alt="Host avatar"
        />
      </div>

      <span className="offer__user-name">{name}</span>
      {isPro && <span className="offer__user-status">Pro</span>}
    </div>
  );
}
