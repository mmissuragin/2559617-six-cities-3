interface Props {
  userPhoto: string;
  userName: string;
  userRating: number;
  userText: string;
  date: string;
}

export function OfferReviewsItem({ userPhoto, userName, userRating, userText, date }: Props) {
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img
            className='reviews__avatar user__avatar'
            src={userPhoto}
            width='54'
            height='54'
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>
          {userName}
        </span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{ width: `${userRating}%` }}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>
          {userText}
        </p>
        <time className='reviews__time' dateTime={date}>
          {new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </li>
  );
}
